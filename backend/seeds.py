from app import app, db
from models.user import User

with app.app_context():
  db.drop_all()
  db.create_all()

lara=User(
  email="lara@lara.com",
	first_name="lara",
	last_name="lara",
	password="lara",
	

)

db.session.add(lara)
db.session.commit()