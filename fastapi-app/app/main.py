# -*- coding: utf-8 -*-

from fastapi import FastAPI, Depends, Request, HTTPException, status, Header
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt, JWTError
from .config import Config
from . import schemas
from .database import create_access_token
from . import database as db
from . import crud
from typing import Union, List
from pydantic import Json
from enum import Enum
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, OAuth2AuthorizationCodeBearer
from typing import Annotated
from playhouse.shortcuts import model_to_dict

app = FastAPI()

config = Config()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


sleep_time = 10


async def reset_db_state():
    db.db._state._state.set(db.db_state_default.copy())
    db.db._state.reset()


def get_db(db_state=Depends(reset_db_state)):
    try:
        db.db.connect()
        yield
    finally:
        if not db.db.is_closed():
            db.db.close()


class Tags(Enum):
    events = "Events"
    common = "Common"
    users = "Users"


oauth2_scheme = OAuth2AuthorizationCodeBearer(authorizationUrl="user", tokenUrl="login")


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
        user_id: int = payload.get("sub").get("id")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = crud.get_user(user_id)
    if user is None:
        raise credentials_exception

    return user


async def get_user_token(auth):
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    token = auth.split(" ")[1]
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
        user_id: int = int(payload.get("id"))
        user = crud.get_user(user_id)
        if user is None:
            raise JWTError
        user_dict = model_to_dict(user)
        user_dict["token"] = token
        return user_dict
    except JWTError as e:
        # print(e)
        raise HTTPException(status_code=401, detail="Invalid token")


# DONE: Users API


@app.get("/user/", tags=[Tags.users], response_model=schemas.User)
async def get_user(authorization: str = Header(...)):
    print(authorization)
    return await get_user_token(authorization)


@app.post("/login/", tags=[Tags.users], dependencies=[Depends(get_db)])
async def login_user(credentials: schemas.UserLogin):
    email = credentials.email
    password = credentials.password
    user = crud.login_user(email, password)
    # print(model_to_dict(user))
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return {"access_token": create_access_token(user), "token_type": "bearer"}


@app.post("/users/", dependencies=[Depends(get_db)], response_model=Union[schemas.UserToken, None, schemas.Error], tags=[Tags.users])
async def create_user(data: schemas.UserCreate):
    user = crud.create_user(data)
    user_dict = model_to_dict(user)
    user_dict["token"] = create_access_token(user)
    return user_dict


@app.put("/users/", dependencies=[Depends(get_db)], response_model=Union[schemas.UserToken, None], tags=[Tags.users], deprecated=True)
async def update_user(item: schemas.Update):
    return crud.update_user(item.id, item.new_json)


@app.delete("/users/{user_id}", dependencies=[Depends(get_db)], response_model=schemas.DeleteResponse, tags=[Tags.users], deprecated=True)
async def delete_user(user_id: str):
    return {"deleted_count": crud.delete_user(user_id)}


# TODO: Event API


@app.post("/events/", dependencies=[Depends(get_db)], tags=[Tags.events], response_model=schemas.Event)
async def create_event(event: schemas.EventCreate, authorization: str = Header(...)):
    user = await get_user_token(authorization)
    event = crud.create_event(event, user["id"])
    return event


@app.get("/events/", dependencies=[Depends(get_db)], tags=[Tags.events], response_model=List[schemas.Event])
async def get_events(authorization: str = Header(...), skip: int = 0, limit: int = 100):
    user = await get_user_token(authorization)
    events = crud.get_events(skip=skip, limit=limit)
    return events


@app.get("/generate_reports/", tags=[Tags.common], dependencies=[Depends(get_db)])
def get_setlist_pdf():
    path = crud.generate_files()
    return FileResponse(path=path, filename=f"Report.zip", media_type="application/zip")