from app import app, db
from models.user import User

with app.app_context():
  db.drop_all()
  db.create_all()

lara=User(
  email="lara@lara.com",
	first_name="lara",
	last_name="lara",
	password="lara"

)

shaikh=User(
  email="shaikh@shaikh.com",
	first_name="shaikh",
	last_name="shaikh",
	password="shaikh"
)

db.session.add(lara)
db.session.add(shaikh)
db.session.commit()