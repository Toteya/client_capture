#!/usr/bin/python3
"""
base: contains BaseModel implementation
"""
from sqlalchemy import Column, String
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
        for key, value in obj_dict.items():
            if isinstance(value, list):
                if all(isinstance(item, BaseModel) for item in value):
                    obj_dict[key] = [item.to_dict() for item in value]
        return obj_dict
    
    def save(self):
        """ Saves the instance to the database
        """
        from server.models import storage
        storage.new(self)
        storage.save()
    
    def delete(self):
        """ Deletes the instance from the database
        """
        from server.models import storage
        storage.delete(self)
        storage.save()
