"""
client: Contains client model implementation
"""
from sqlalchemy import Column, ForeignKey, String, Table
from sqlalchemy.orm import relationship
from server.models.base import BaseModel
from server.models.base import Base
from server.models.base import Column


client_contact_assoc = Table(
    'client_contact',
    Base.metadata,
    Column('client_id', String(60), ForeignKey('clients.id'), primary_key=True),
    Column('contact_id', String(60), ForeignKey('contacts.id'), primary_key=True)
)

class Client(BaseModel, Base):
    """ Client class that inherits from BaseModel and Base
    """

    __tablename__ = 'clients'

    name = Column('name', String(128), nullable=False)
    client_code = Column('client_code', String(128), nullable=False)

    contacts = relationship('Contact', back_populates='clients', secondary=client_contact_assoc)
