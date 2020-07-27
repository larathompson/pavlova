from app import db
from flask_marshmallow import Marshmallow
from marshmallow import fields
from datetime import *

class BaseModel:

  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow)

  def save(self):
    db.session.add(self)
    db.session.commit()

  def remove(self):
    db.session.delete(self)
    db.session.commit()

