from datetime import timedelta, datetime
from typing import Union

from dotenv import load_dotenv
from contextvars import ContextVar
import peewee as pw
from jose import jwt
from playhouse.postgres_ext import PostgresqlExtDatabase
from .config import Config

load_dotenv()

db_state_default = {"closed": None, "conn": None, "ctx": None, "transactions": None}
db_state = ContextVar("db_state", default=db_state_default.copy())

config = Config()

db = PostgresqlExtDatabase(config.DATABASE_NAME, user=config.DATABASE_USERNAME, password=config.DATABASE_PASSWORD,
                           host=config.DATABASE_HOST, port=config.DATABASE_PORT)


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = {"id": str(data.id)}
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, config.SECRET_KEY, algorithm=config.ALGORITHM)
    return encoded_jwt


class PeeweeConnectionState(pw._ConnectionState):
    def __init__(self, **kwargs):
        super().__setattr__("_state", db_state)
        super().__init__(**kwargs)

    def __setattr__(self, name, value):
        self._state.get()[name] = value

    def __getattr__(self, name):
        return self._state.get()[name]


db._state = PeeweeConnectionState()


class BaseModel(pw.Model):
    class Meta:
        database = db


class User(BaseModel):  # TODO: Done
    email = pw.CharField()
    firstName = pw.CharField()
    lastName = pw.CharField()
    password = pw.BlobField()
    salt = pw.BlobField()
    createdAt = pw.TimestampField()
    post = pw.CharField()
    role = pw.CharField()


class Event_type(BaseModel):
    name = pw.CharField()


class File(BaseModel):
    name = pw.CharField()
    content = pw.BlobField()


class Event(BaseModel):
    creation_date = pw.DateTimeField()
    end_date = pw.DateTimeField()
    users_id = pw.ForeignKeyField(User)
    description = pw.CharField()
    type = pw.ForeignKeyField(Event_type)
    level = pw.IntegerField()
    version = pw.IntegerField()


class File_assign(BaseModel):
    event = pw.ForeignKeyField(Event)
    file = pw.ForeignKeyField(File)


class History(BaseModel):
    event_id = pw.ForeignKeyField(Event)
    parent_id = pw.ForeignKeyField(Event)
    user_id = pw.ForeignKeyField(User)
    reason = pw.CharField()


tables = [User, Event_type, File, Event, File_assign, History]


def create_tables() -> None:
    with db:
        db.create_tables((tables))


if __name__ == "__main__":
    db.drop_tables(tables)
    create_tables()