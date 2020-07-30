import os

db_URI = os.getenv('DATABASE_URL', 'postgres://localhost:5432/datingdb')
secret = os.getenv('SECRET', 'This is a very secret string only I know')
