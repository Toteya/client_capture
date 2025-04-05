"""
Initialilse the models package.
"""
from server.models.engine.db_storage import DBStorage

storage = DBStorage(
    user = 'client_cap',
    password = 'client_cap_pwd',
    host = 'localhost',
    db = 'client_cap_db'
)
storage.load()
