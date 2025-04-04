"""
client: Contains client model implementation
"""
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from models.base_model import BaseModel
from models.base_model import Base
from models.base_model import Column


class Client(BaseModel, Base):
    """ Client class that inherits from BaseModel and Base
    """

    __tablename__ = 'clients'

    name = Column('name', String(128), nullable=False)
    client_code = Column('client_code', String(128), nullable=False)

    contacts = relationship('Contact', back_populates='client')
