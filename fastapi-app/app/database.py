from datetime import datetime, timedelta
from typing import Union

from jose import JWTError, jwt

# from credentials import MONGO_URI
from pymongo import MongoClient
import time, bcrypt, hashlib
from dotenv import load_dotenv
import os
from bson import objectid

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = {"sub": {"id": str(data["_id"]), "login": data["login"], "email": data["email"], "artists": data["artists"]}}
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


class DB:
    def __init__(self):
        self.client = MongoClient(os.getenv("MONGO_URI"))
        self.database = self.client.setlistGenerator
        self.setlists = self.database["setlists"]
        self.users = self.database["users"]
        self.artists = self.database["artists"]


    # def add_user(self, email: str, login: str, password_hash: str, salt: str):
    #     return self.users.insert_one({
    #         "email": email,
    #         "login": login,
    #         "password_hash": password_hash,
    #         "salt": salt
    #     }).inserted_id

    def get_setlists_by_artist(self, artist: str):
        return list(self.setlists.find({"artist": artist}))

    def update_user_token(self, phone):
        token = phone + str(time.time()) + phone * 2 + str(time.time())
        token = hashlib.sha256(token.encode("utf-8")).digest().hex()
        return self.users.update_one(
            {"phone": phone},
            {"$set": {"token": token, "creation_date": int(time.time())}}, upsert=True).modified_count

    def get_user(self, login):
        return self.users.find_one({"login": login})

    # DONE: Artist CRUD

    def get_all_artists(self):
        return list(self.artists.find({}).sort([['_id', 1]]))

    def get_artist_by_id(self, _id: str):
        data = []
        if objectid.ObjectId.is_valid(_id):
            data = list(self.artists.find({"_id": objectid.ObjectId(_id)}).sort([['_id', 1]]).limit(1))
        return data[0] if len(data) else None

    def delete_artist(self, _id: str):
        return self.artists.delete_one({"_id": objectid.ObjectId(_id)}).deleted_count

    def update_artist(self, _id: str, new_json: dict):
        new_artist = self.artists.update_one(
            {"_id": objectid.ObjectId(_id)},
            {"$set": new_json}, upsert=False)
        if new_artist.matched_count == 0:
            return None
        return self.get_artist_by_id(_id)

    def get_artist_by_name(self, name: str):
        return list(self.artists.find({"name": name}))

    def add_artist(self, name: str, songs: list, users: list):
        artist_id = self.artists.insert_one({
            "name": name,
            "songs": songs,
            "users": users
        }).inserted_id
        return self.get_artist_by_id(str(artist_id))

    def add_artist_song(self, _id: str, song: str):
        new_artist = self.artists.update_one(
            {"_id": objectid.ObjectId(_id)},
            {"$push": {"songs": song}}, upsert=False)
        if new_artist.matched_count == 0:
            return None
        return self.get_artist_by_id(_id)

    def delete_artist_song(self, _id: str, song: str):
        new_artist = self.artists.update_one(
            {"_id": objectid.ObjectId(_id)},
            {"$pull": {"songs": song}}, upsert=False)
        if new_artist.matched_count == 0:
            return None
        return self.get_artist_by_id(_id)

    def add_user_to_artist(self, artist_id: str, user_id: str):
        user = self.get_user_by_id(user_id)
        artist = self.get_artist_by_id(artist_id)
        if not user or not artist:
            return None
        new_user = self.users.update_one(
            {"_id": objectid.ObjectId(user_id)},
            {"$push": {"artists": artist["name"]}}, upsert=False
        )
        new_artist = self.artists.update_one(
            {"_id": objectid.ObjectId(artist_id)},
            {"$push": {"users": user["login"]}}, upsert=False)
        return self.get_artist_by_id(artist_id)

    # DONE: Setlist CRUD

    def get_all_setlists(self):
        return list(self.setlists.find({}).sort([['_id', 1]]))

    def get_setlist_by_id(self, _id: str):
        data = []
        if objectid.ObjectId.is_valid(_id):
            data = list(self.setlists.find({"_id": objectid.ObjectId(_id)}).sort([['_id', 1]]).limit(1))
        return data[0] if len(data) else None

    def delete_setlist(self, _id: str):
        return self.setlists.delete_one({"_id": objectid.ObjectId(_id)}).deleted_count

    def update_setlist(self, _id: str, new_json: dict):
        new_setlist = self.setlists.update_one(
            {"_id": objectid.ObjectId(_id)},
            {"$set": new_json}, upsert=False)
        if new_setlist.matched_count == 0:
            return None
        return self.get_setlist_by_id(_id)

    def add_setlist(self, venue: str, city: str, date: datetime, comment: str, artist: str, songs: list):
        setlist_id = self.setlists.insert_one({
            "venue": venue,
            "city": city,
            "date": date,
            "comment": comment,
            "artist": artist,
            "songs": songs
        }).inserted_id
        return self.get_setlist_by_id(str(setlist_id))

    # TODO: Users CRUD

    def get_all_users(self):
        return list(self.users.find({}).sort([['_id', 1]]))

    def get_user_by_id(self, _id: str):
        data = []
        if objectid.ObjectId.is_valid(_id):
            data = list(self.users.find({"_id": objectid.ObjectId(_id)}).sort([['_id', 1]]).limit(1))
        return data[0] if len(data) else None

    def get_user_by_login(self, login: str):
        return list(self.users.find({"login": login}))

    def delete_user(self, _id: str):
        return self.users.delete_one({"_id": objectid.ObjectId(_id)}).deleted_count

    def update_user(self, _id: str, new_json: dict):
        new_user = self.users.update_one(
            {"_id": objectid.ObjectId(_id)},
            {"$set": new_json}, upsert=False)
        if new_user.matched_count == 0:
            return None
        return self.get_user_by_id(_id)

    def add_user(self, login: str, email: str, password: str):
        salt = bcrypt.gensalt()
        password = bytes(password, 'utf-8')
        password_hash = bcrypt.hashpw(password, salt)
        # print(password_hash, salt)
        if len(self.get_user_by_login(login)) or len(self.get_user_by_email(email)):
            return {"error": "User already exists"}
        user_id = self.users.insert_one({
            "login": login,
            "email": email,
            "password_hash": password_hash,
            "salt": salt,
            "artists": []
        }).inserted_id
        # print(user_id)
        return self.get_user_by_id(str(user_id))

    def get_user_by_email(self, email: str):
        return list(self.users.find({"email": email}))

    def login_user(self, email: str, password: str):
        user = self.get_user_by_email(email)

        if len(user):
            if bcrypt.checkpw(bytes(password, "utf-8"), user[0]["password_hash"]):
                return user[0]
            else:
                return None
        else:
            return None

    def update_password(self, email: str, old_password: str, new_password: str):
        user = self.login_user(email, old_password)
        if user is None:
            return None
        new_password = bytes(new_password, 'utf-8')
        password_hash = bcrypt.hashpw(new_password, user["salt"])
        self.update_user(user["_id"], {"password_hash": password_hash})
        return self.get_user_by_id(user["_id"])

    # FIXME: delete rest

    def add_new_user_to_artist(self, artist_name: str, user: str):
        artist = self.get_artist_by_name(artist_name)[0]
        users = list(artist["users"])
        users.append(user)
        new_d = {"users": users}
        return self.update_artist(artist["_id"], new_d)
