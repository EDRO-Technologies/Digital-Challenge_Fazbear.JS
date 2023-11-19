import asyncio
import random
import time
from datetime import datetime

import bcrypt

from . import database as models, schemas, export_ex

from typing import List, Union


# User CRUD


def get_user(user_id: int):
    return models.User.filter(models.User.id == user_id).first()


def get_users(skip: int = 0, limit: int = 100):
    return list(models.User.select().offset(skip).limit(limit))


def create_user(user: schemas.UserCreate):
    salt = bcrypt.gensalt()
    # print("USER: ", user)
    password = bytes(user.password, 'utf-8')
    password_hash = bcrypt.hashpw(password, salt)
    user.password = password_hash
    user_dict = user.dict()
    user_dict["salt"] = salt
    user_dict["createdAt"] = int(time.time())
    db_user = models.User(**user_dict)
    db_user.save()
    return db_user


def delete_users(user_ids: List[int]):
    user_ids = list(user_ids)
    q = models.User.delete().where(models.User.id << user_ids)
    return q.execute()


def get_user_by_email(email: str) -> Union[models.User, None]:
    return models.User.filter(models.User.email == email).first()


def login_user(email: str, password: str) -> Union[models.User, None]:
    user = get_user_by_email(email)
    if user:
        if bcrypt.checkpw(bytes(password, "utf-8"), bytes(user.password)):
            return user
        else:
            return None
    else:
        return None


# Events CRUD


def create_event(event: schemas.EventCreate, user_id: int):
    event_dict = event.dict()
    event_dict["creation_date"] = datetime.now()
    event_dict["users_id"] = user_id
    event_dict["end_date"] = datetime.fromtimestamp(event_dict["end_date"])
    db_event = models.Event(**event_dict)
    db_event.save()
    return db_event


def get_events(skip: int = 0, limit: int = 100):
    return list(models.Event.select().offset(skip).limit(limit))


def generate_files():
    events = get_events()
    table = []
    for event in events:
        struct = {
            'date': event.creation_date,
            'messages': event.type.name,
            'shift_end': event.end_date,
            'visas': event.version,
            'notes': event.description,
        }
        table.append(struct)
    path = export_ex.process_files(table)
    return path
