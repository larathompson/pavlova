from app import db, ma
from models.base import BaseModel
from marshmallow import fields, post_load

class Match(db.Model, BaseModel):
  __tablename__ = 'matches'
  id = db.Column(db.Integer, primary_key=True)
  user_1_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  user_2_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  likes_relationship = db.relationship('User', foreign_keys=[user_2_id], backref='matches')
  



