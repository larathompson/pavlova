from app import db, ma, bcrypt
from models.base import BaseModel, BaseSchema
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import fields, validates_schema, ValidationError
from datetime import *
from environment.config import secret
import jwt

class User(db.Model, BaseModel):

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

  
  

class UserSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  @validates_schema
  def check_passwords_match(self, data, **kwargs):
    if data['password'] != data['password_confirmation']:
      raise ValidationError(
        'Passwords do not match',
        'password_confirmation'
      )

  password = fields.String(required=True)
  password_confirmation = fields.String(required=True)
  #likes = fields.Nested('LikesSchema', many=True)
  #dislikes = fields.Nested('DislikesSchema', many=True)
  #matches = fields.Nested('MathcesSchema', many=True)

  class Meta:
    model = User
    load_instance = True
    exclude = ('password_hash',)
    load_only = ('email', 'password')


  


  
