from app import db, ma, bcrypt
from schemas.base import BaseSchema
from marshmallow import fields, validates_schema, ValidationError
from models.user import User
from flask import request

class UserSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  @validates_schema
  def check_passwords_match(self, data, **kwargs):
    if request.method == 'POST':
      if data['password'] != data['password_confirmation']:
        raise ValidationError(
          'Passwords do not match',
          'password_confirmation'
        )

  password = fields.String(required=False)
  password_confirmation = fields.String(required=False)
  # like = fields.Nested('LikeSchema', many=True)
  # dislikes = fields.Nested('DislikeSchema', many=True)
  # matches = fields.Nested('MatchesSchema', many=True)

  class Meta:
    model = User
    load_instance = True
    exclude = ('password_hash',)
    load_only = ('email', 'password')

# likes = fields.Nested('LikesSchema', many=True)
# dislikes = fields.Nested('DislikesSchema', many=True)
# images = fields.Nested('ImagesSchema', many=True)
#user = fields.Nested('UserSchema', only='id',)


  
