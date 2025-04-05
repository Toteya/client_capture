"""
MySQL database engine for SQLAlchemy
This module provides a MySQL database engine for SQLAlchemy, allowing
for interaction with MySQL databases using SQLAlchemy's ORM capabilities.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from server.models.base import Base
from server.models.client import Client
from server.models.contact import Contact

class DBStorage:
    """
    MySQL database engine for SQLAlchemy
    This class manages the connection to a MySQL database and provides
    methods for storing, retrieving, and deleting objects.
    """
    __engine = None
    __session = None
    __classes = {
        'Clieny': Client,
        'Contact': Contact
    }

    def __init__(self, user, password, host, db):
        """
        Initializes the DBStorage instance with the provided database
        connection parameters.
        """
        url = f'mysql+mysqldb://{user}:{password}@{host}/{db}'
        # url = f'mysql+pymysql://{user}:{password}@{host}/{db}',
        self.__engine = create_engine(url)
        self.__session = scoped_session(sessionmaker(bind=self.__engine))
    

    def all(self, clss=None):
        """ Returns a dictionary of all objects from the specified class
        If no class is specified, returns all objects from all classes.
        """
        ob_list = []
        if clss is not None:
            ob_list = self.__session.query(clss).all()
        else:
            for clss in self.__classes.values():
                ob_list.extend(self.__session.query(clss).all())

        obj_dict = {}
        for obj in ob_list:
            key = f'{obj.__class__.__name__}.{obj.id}'
            obj_dict[key] = obj

        return obj_dict


    def save(self):
        """ Commits all changes to the database session
        """
        self.__session.commit()
      
    def load(self):
        """ Loads all objects from the database
        """
        Base.metadata.create_all(self.__engine)
        self.__session = scoped_session(sessionmaker(bind=self.__engine))

    def close(self):
        """ Closes the database session
        """
        self.__session.remove()
