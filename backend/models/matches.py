from app import db, ma
from models.base import BaseModel
from marshmallow import fields, post_load
from models.likes import Like

class Match(db.Model, BaseModel, Like):
  __tablename__ = 'matches'
  user_1_id = db.Column(db.Integer, db.ForeignKey('likes.liker_id'), primary_key=True)
  user_2_id = db.Column(db.Integer, db.ForeignKey('likes.liked_id'), primary_key=True)
  likes_relationship = db.relationship('Like', secondary=likes, backref='matches')



