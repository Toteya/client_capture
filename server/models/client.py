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

    contacts = relationship('Contact', back_populates='clients', secondary=client_contact_assoc, lazy='joined')

    def __init__(self, *args, **kwargs):
        """ Initializes the Client instance
        """
        self.client_code = self.generate_client_code(kwargs.get('name'))
        super().__init__(*args, **kwargs)
    
    def generate_client_code(self, name):
        """ Generates a unique client code
        """
        from server.models import storage
        prefix = ''
        if len(name.split()) >= 3:
            prefix = f"{name.split()[0][0].upper()}{name.split()[1][0].upper()}{name.split()[2][0].upper()}"
        elif len(name.split()) == 2:
            prefix = f"{name.split()[0][0].upper()}{name.split()[0][1].upper()}{name.split()[1][0].upper()}"
        else:
            prefix = f"{name[0].upper()}{name[1].upper()}{name[2].upper()}"

        codes = storage.get_client_codes(prefix)
        suffix = 1
        new_code = f"{prefix}00{suffix}"

        while True:
            if new_code in codes:
                suffix += 1
                if suffix < 10:
                    new_code = f"{prefix}00{suffix}"
                elif suffix < 100:
                    new_code = f"{prefix}0{suffix}"
                else:
                    new_code = f"{prefix}{suffix}"
            else:
                break
        return new_code
