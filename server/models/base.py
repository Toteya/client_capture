#!/usr/bin/python3
"""
base: contains BaseModel implementation
"""
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase
from uuid import uuid4


class Base(DeclarativeBase):
    """ Base class for all mapped classes
    """
    pass


class BaseModel():
    """
    BaseModel class for all models (mapped classed)
    """
    id = Column('id', String(60), primary_key=True, default=str(uuid4()))

    def __init__(self, *args, **kwargs):
        self.id = str(uuid4())

        if kwargs:
            for key, value in kwargs.items():
                if key == '__class__':
                    continue
                if hasattr(self, key):
                    setattr(self, key, value)


    def to_dict(self):
        """ Returns a dictionary representation of the instance
        """
        obj_dict = self.__dict__.copy()
        obj_dict['__class__'] = self.__class__.__name__
        if obj_dict.get('_sa_instance_state'):
            del obj_dict['_sa_instance_state']

        return obj_dict
