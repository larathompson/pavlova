from app import db, ma
from models.base import BaseModel, BaseSchema
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import fields, validates_schema, ValidationError, post_dump
from datetime import *
from environment.config import secret
import jwt

class User(db.Model, BaseModel):

  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(128), nullable=True, unique=True)
  first_name = db.Column(db.String(128), nullable=True, unique=True)
  last_name = db.Column(db.String(128), nullable=True, unique=True)
  password_hash = db.Column(db.String(128), nullable=True)
  age = db.Column(db.Integer, nullable=True)
  age_pref_min = db.Column(db.Integer(128), nullable=True)
  age_pref_max = db.Column(db.Integer, nullable=True)
  gender = db.Column(db.String(6), nullable=True)
  gender_pref = db.Column(db.String(128), nullable=True)
  location_longitude = db.Column(db.Float(20), nullable=False)
  location_latitude = db.Column(db.Float(20), nullable=False)
  location_longitude_pref = db.Column(db.Float(20), nullable=False)
  location_latitude_pref = db.Column(db.Float(20), nullable=False)
  bio = db.Column(db.String(500), nullable=True, unique=True)

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
      
    }

  

class UserScema(ma.SQLAlchemyAutoSchema, BaseSchema):


  


  
 
