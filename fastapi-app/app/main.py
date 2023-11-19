# -*- coding: utf-8 -*-

from fastapi import FastAPI, Depends, Request, HTTPException
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware

from . import schemas, setlist_processer
from .database import DB, create_access_token
from typing import Union, List
from pydantic import Json
from enum import Enum
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated



app = FastAPI()

db = DB()

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


class Tags(Enum):
    setlists = "Setlists"
    artists = "Artists"
    common = "Common"
    users = "Users"


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


@app.get("/items/", tags=[Tags.common])
async def read_items(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}


# DONE: Setlists API


@app.get("/setlists/", response_model=List[schemas.Setlist], tags=[Tags.setlists])
async def get_all_setlists():
    return db.get_all_setlists()


@app.get("/setlists/{setlist_id}", response_model=Union[schemas.Setlist, None], tags=[Tags.setlists])
async def get_setlist(setlist_id: str):
    return db.get_setlist_by_id(setlist_id)


@app.post("/setlists/", response_model=schemas.Setlist, tags=[Tags.setlists])
async def create_setlist(setlist: schemas.SetlistCreate):
    return db.add_setlist(setlist.venue, setlist.city, setlist.date, setlist.comment, setlist.artist, setlist.songs)


@app.delete("/setlists/{setlist_id}", response_model=schemas.DeleteResponse, tags=[Tags.setlists])
async def delete_setlist(setlist_id: str):
    return {"deleted_count": db.delete_setlist(setlist_id)}


@app.put("/setlists/", response_model=Union[schemas.Setlist, None], tags=[Tags.setlists])
async def update_setlist(item: schemas.Update):
    return db.update_setlist(item.id, item.new_json)


# DONE: Artists API

@app.get("/artists/", response_model=List[schemas.Artist], tags=[Tags.artists])
async def get_all_artists():
    return db.get_all_artists()


@app.get("/artists/{artist_id}", response_model=Union[schemas.Artist, None], tags=[Tags.artists])
async def get_artist_by_id(artist_id: str):
    return db.get_artist_by_id(artist_id)


@app.get("/artists/name/{name}", response_model=Union[schemas.Artist, None], tags=[Tags.artists])
async def get_artist_by_name(name: str):
    return db.get_artist_by_name(name)[0]


@app.post("/artists/", response_model=schemas.Artist, tags=[Tags.artists])
async def create_artist(artist: schemas.ArtistCreate):
    created = db.add_artist(artist.name, artist.songs, [])
    for user_login in artist.users:
        user = db.get_user_by_login(user_login)
        new = db.add_user_to_artist(created["_id"], user[0]["_id"])
    return new


@app.post("/artists/user/", response_model=schemas.Artist, tags=[Tags.artists])
async def add_user_to_artist(data: schemas.ArtistUser):
    user = db.get_user_by_login(data.login)
    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    artist = db.add_user_to_artist(data.id, user[0]["_id"])
    if not artist:
        raise HTTPException(status_code=400, detail="Artist not found")
    return artist


@app.delete("/artists/{artist_id}", response_model=schemas.DeleteResponse, tags=[Tags.artists])
async def delete_artist(artist_id: str):
    return {"deleted_count": db.delete_artist(artist_id)}


@app.put("/artists/", response_model=Union[schemas.Artist, None], tags=[Tags.artists])
async def update_artist(item: schemas.Update):
    return db.update_artist(item.id, item.new_json)


@app.put("/artists/song/", response_model=Union[schemas.Artist, None], tags=[Tags.artists])
async def add_artist_song(item: schemas.ArtistSong):
    return db.add_artist_song(item.id, item.song)


@app.delete("/artists/song/", response_model=Union[schemas.Artist, None], tags=[Tags.artists])
async def delete_artist_song(item: schemas.ArtistSong):
    return db.delete_artist_song(item.id, item.song)


# DONE: Users API


@app.get("/users/", response_model=List[schemas.User], tags=[Tags.users])
async def get_all_users():
    return db.get_all_users()


@app.get("/users/{user_id}", response_model=Union[schemas.User, None], tags=[Tags.users])
async def get_user_by_id(user_id: str):
    return db.get_user_by_id(user_id)


@app.get("/users/login/{login}", response_model=Union[schemas.User, None], tags=[Tags.users])
async def get_user_by_login(login: str):
    return db.get_user_by_login(login)[0]


@app.post("/login/", tags=[Tags.users]) # , response_model=Union[schemas.User, None]
async def login_user(credentials: schemas.UserLogin): #
    email = credentials.email
    password = credentials.password
    user = db.login_user(email, password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return {"access_token": create_access_token(user), "token_type": "bearer"}


@app.post("/users/", response_model=Union[schemas.User, None, schemas.Error], tags=[Tags.users])
async def create_user(data: schemas.UserCreate):
    return db.add_user(data.login, data.email, data.password)


@app.put("/users/", response_model=Union[schemas.User, None], tags=[Tags.users])
async def update_user(item: schemas.Update):
    return db.update_user(item.id, item.new_json)


@app.delete("/users/{user_id}", response_model=schemas.DeleteResponse, tags=[Tags.users])
async def delete_user(user_id: str):
    return {"deleted_count": db.delete_user(user_id)}


@app.post("/users/update_password", tags=[Tags.users])
async def update_user_password(data: schemas.UserUpdatePassword):
    user = db.update_password(data.email, data.password, data.new_password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return {"status": "Done"}



# TODO: Common methods

@app.get("/setlists/artist/{artist_name}", response_model=List[schemas.Setlist], tags=[Tags.common])
async def get_setlists_by_artist(artist_name: str):
    return db.get_setlists_by_artist(artist_name)


@app.get("/setlists/html/{setlist_id}", tags=[Tags.common])
async def get_setlist_html(setlist_id: str):
    return HTMLResponse(setlist_processer.generate_html(setlist_id))


@app.get("/setlists/pdf/{setlist_id}", tags=[Tags.common])
def get_setlist_pdf(setlist_id: str):
    path = setlist_processer.generate_pdf(setlist_id)
    return FileResponse(path=path, filename=f"{setlist_id}.pdf", media_type="application/pdf")