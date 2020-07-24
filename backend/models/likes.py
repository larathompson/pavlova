from app import db, ma
from models.base import BaseModel, BaseSchema
from marshmallow import fields, post_load
from models.user import User

users_liked = db.Table('users_liked', 
  user1=db.Column()

)

