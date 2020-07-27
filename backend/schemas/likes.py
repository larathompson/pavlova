from app import db, ma
from schemas.base import BaseSchema
from marshmallow import fields
from models.likes import Like
from models.base import BaseModel

class LikeSchema(ma.SQLAlchemyAutoSchema, BaseSchema):
  class Meta:
    model = Like
    load_instance = True


  #liked_id = fields.Integer()
  user_relationship = fields.Nested('UserSchema', many=True)
  # liker_id = fields.Integer()