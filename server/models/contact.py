"""
contact: Contains contact model implementation.
"""
from sqlalchemy import Column, ForeignKey, String
from server.models.base import Base, BaseModel
from sqlalchemy.orm import relationship


class Contact(BaseModel, Base):
    """
    Contact class that defines the contact table.
    """
    __tablename__ = 'contacts'

    name = Column('name', String(128), nullable=False)
    surname = Column('surname', String(128), nullable=False)
    email = Column('email', String(128), unique=True, nullable=False)
    client_id = Column('client_id', String(36), ForeignKey('clients.id'), nullable=True)

    client = relationship('Client', back_populates='contacts')
