from app import db, ma, bcrypt
from models.base import BaseModel, BaseSchema
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import fields, validates_schema, ValidationError
from datetime import *
from environment.config import secret
import jwt
from models.likes import Like, LikeSchema
from models.dislikes import Dislike, DislikeSchema
from sqlalchemy.ext.declarative import declarative_base
from flask import request

Base = declarative_base()

# likes_table = db.Table('likes_table',
#    db.Column('like_id', db.Integer, db.ForeignKey('likes.id'), primary_key=True),
#    db.Column('liked_by_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#    db.Column('likee_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
# )



# dislikes_table = db.Table('dislikes_table',
#    db.Column('dislike_id', db.Integer, db.ForeignKey('dislikes.id'), primary_key=True),
#    db.Column('disliked_by_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#    db.Column('dislikee_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
# )




class User(db.Model, BaseModel, Base):

  __tablename__ = 'users'

  email = db.Column(db.String(128), nullable=False, unique=True)
  first_name = db.Column(db.String(128), nullable=False, unique=True)
  last_name = db.Column(db.String(128), nullable=False, unique=True)
  password_hash = db.Column(db.String(128), nullable=False)
  dob = db.Column(db.Integer(), nullable=True)
  age_pref_min = db.Column(db.Integer(), nullable=True)
  age_pref_max = db.Column(db.Integer, nullable=True)
  gender = db.Column(db.String(6), nullable=True)
  gender_pref = db.Column(db.String(128), nullable=True)
  location_longitude = db.Column(db.Float(20), nullable=True)
  location_latitude = db.Column(db.Float(20), nullable=True)
  location_longitude_pref = db.Column(db.Float(20), nullable=True)
  location_latitude_pref = db.Column(db.Float(20), nullable=True)
  bio = db.Column(db.String(500), nullable=True, unique=True)
  # like = db.relationship('Like', secondary=like, primaryjoin="User.id==likes_table.c.liked_by_id", secondaryjoin="User.id==likes_table.c.likee_id", backref='users')
  # dislike = db.relationship('Dislike', secondary=dislike, primaryjoin="User.id==dislikes_table.c.disliked_by_id", secondaryjoin="User.id==dislikes_table.c.dislikee_id", backref='users')
  like = db.relationship('Like', backref='users')
  dislike = db.relationship('Dislike', backref='users')
  # match = db.relationship('Match', secondary=users_match, backref='users')



  def save(self):
    db.session.add(self)
    db.session.commit()

  @hybrid_property
  def password(self):
    pass

  @password.setter
  def password(self, password_plaintext):
    self.password_hash = bcrypt.generate_password_hash(password_plaintext).decode('utf-8')

  def validate_password(self, password_plaintext):
    return bcrypt.check_password_hash(self.password_hash, password_plaintext)
  
  def generate_token(self):
    payload = {
      'exp': datetime.utcnow() + timedelta(days=7),
      'iat' : datetime.utcnow(),
      'sub' : self.id

    }

    token = jwt.encode(
      payload,
      secret,
      'HS256'
    ).decode('utf-8')

    return token

class Images(db.Model, BaseModel):

  __tablename__= 'images'

  image_1 = db.Column(db.String(300), nullable=False)
  image_2 = db.Column(db.String(300), nullable=True)
  image_3 = db.Column(db.String(300), nullable=True)
  image_4 = db.Column(db.String(300), nullable=True)
  image_5 = db.Column(db.String(300), nullable=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  user = db.relationship('User', backref='images')
  
class ImagesSchema(ma.SQLAlchemyAutoSchema, BaseSchema):
  class Meta:
    model = Images
    load_instance = True

  

  
  

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


  


  
 
