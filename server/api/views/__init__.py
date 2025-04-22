"""
Flask blueprint for views.
This module contains the Flask blueprint for handling view-related routes.
"""

from flask import Blueprint

api_views = Blueprint("api_views", __name__, url_prefix="/api")

from server.api.views.clients import *
from server.api.views.contacts import *
