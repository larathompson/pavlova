from app import db, ma
from schemas.base import BaseSchema
from marshmallow import fields
from models.matches import Match

class MatchSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Match
    load_instance = True


  likes_relationship = fields.Nested('UserSchema')
#user_relationship = fields.Nested('UserSchema', many=True)