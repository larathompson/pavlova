from app import db, ma
from schemas.base import BaseSchema
from marshmallow import fields, post_load
from model.dislike import Dislike


class DislikeSchema(ma.SQLAlchemyAutoSchema, BaseSchema):
  class Meta:
    model = Dislike
    load_instance = True
  
  disliked_id = fields.Integer()