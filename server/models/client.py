"""
client: Contains client model implementation
"""
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from server.models.base import BaseModel
from server.models.base import Base
from server.models.base import Column


class Client(BaseModel, Base):
    """ Client class that inherits from BaseModel and Base
    """

    __tablename__ = 'clients'

    name = Column('name', String(128), nullable=False)
    client_code = Column('client_code', String(128), nullable=False)

    contacts = relationship('Contact', back_populates='client')
