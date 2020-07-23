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

ali=User(
  email="ali@ali.com",
	first_name="ali",
	last_name="ali",
	password="ali"
)

db.session.add(lara)
db.session.add(shaikh)
db.session.add(ali)
db.session.commit()