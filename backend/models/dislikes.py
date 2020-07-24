from app import db, ma
from models.base import BaseModel, BaseSchema
from marshmallow import fields, post_load
#from models.user import User

class Dislikes(db.Model, BaseModel):

  __tablename__ = 'dislikes'

class DislikesSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Dislikes