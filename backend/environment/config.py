import os

db_URI = os.getenv('postgres://localhost:5432/datingdb')
secret = os.getenv('This is a very secret string only I know')
