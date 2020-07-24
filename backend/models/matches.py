from app import db, ma
from models.base import BaseModel, BaseSchema
from marshmallow import fields, post_load
from models.user import User

users_matched = db.Table('users_matched', 
  user1=db.Column()

)

