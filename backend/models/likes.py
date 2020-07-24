from app import db, ma
from models.base import BaseModel
from marshmallow import fields
#from models.user import User

class Likes(db.Model, BaseModel):

  __tablename__ = 'likes'

class LikesSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Likes
    load_instance = True
