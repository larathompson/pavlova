from app import db, ma
from models.base import BaseModel, BaseSchema
from marshmallow import fields, post_load
from models.user import User

class Like(db.Model, BaseModel):
  __tablename__ = 'likes'
  liked_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
  liker_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
  user_relationship = db.relationship('User', foreign_keys=[liker_id], backref='likes')

class LikeSchema(ma.SQLAlchemyAutoSchema, BaseSchema):
  class Meta:
    model = Like
    load_instance = True


  liked_id = fields.Integer()
  # user_relationship = fields.Nested('UserSchema', only=('id'))
  # liker_id = fields.Integer()