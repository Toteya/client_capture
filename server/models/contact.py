"""
contact: Contains contact model implementation.
"""
from sqlalchemy import Column, String
from models.base import Base, BaseModel
from sqlalchemy.orm import relationship


class Contact(BaseModel, Base):
    """
    Contact class that defines the contact table.
    """
    __tablename__ = 'contacts'

    name = Column('name', String(128), nullable=False)
    surname = Column('surname', String(128), nullable=False)
    email = Column('email', String(128), unique=True, nullable=False)

    relationships = relationship('Client', back_populates='contacts')
