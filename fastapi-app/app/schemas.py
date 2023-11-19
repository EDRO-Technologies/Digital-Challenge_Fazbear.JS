# -*- coding: utf-8 -*-
from datetime import datetime
from typing import Any, List, Union

from bson import objectid
from pydantic import BaseModel, validator, root_validator, field_validator
from pydantic.utils import GetterDict

import peewee
from pydantic import BaseModel, validator
from pydantic.utils import GetterDict
from . import database


class PeeweeGetterDict(GetterDict):
    def get(self, key: Any, default: Any = None):
        res = getattr(self._obj, key, default)
        if isinstance(res, peewee.ModelSelect):
            return list(res)
        return res


class UserLogin(BaseModel):
    email: str
    password: Any


class UserCreate(UserLogin):
    firstName: str
    lastName: str
    post: str
    role: str


class User(UserCreate):
    id: int
    createdAt: Any

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict


    @validator("password")
    def password_serialize(cls, v):
        if type(v) is not str:
            return str(v)

    @validator("createdAt")
    def integerize(cls, v):
        if type(v) is not int:
            return int(datetime.timestamp(v))


class UserToken(User):
    token: str


class EventType(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict


class File(BaseModel):
    name: str
    content: bytes

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict


class EventCreate(BaseModel):
    end_date: int
    description: str
    type: int
    level: int
    version: int

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict


class Event(EventCreate):
    id: int
    creation_date: Any
    end_date: Any
    users_id: User
    description: str
    type: EventType
    level: int
    version: int


class History(BaseModel):
    id: int
    event_id: Event
    parent_id: Event
    reason: str

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict



class UserUpdatePassword(UserLogin):
    new_password: str


class Update(BaseModel):
    id: str
    new_json: dict


class Delete(BaseModel):
    id: str


class DeleteResponse(BaseModel):
    deleted_count: int


class Error(BaseModel):
    error: str