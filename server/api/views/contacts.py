"""
API views for the contact data endpoints
"""
from flask import jsonify, request
from server.models import storage
from server.models.client import Contact
from server.api.views import api_views


@api_views.route('/contacts', methods=['GET'], strict_slashes=False)
def get_contacts():
    """
    Retrieves all contacts
    """
    contacts = storage.all(Contact).values()
    contacts_list = [contact.to_dict() for contact in contacts]
    return jsonify(contacts_list), 200


@api_views.route('/contacts/<contact_id>', methods=['GET'], strict_slashes=False)
def get_contact(contact_id):
    """
    Retrieves a specific contact by ID
    """
    contact = storage.get(Contact, contact_id)
    if not contact:
        return jsonify({"error": "Contact not found"}), 404
    return jsonify(contact.to_dict()), 200

@api_views.route('/contacts', methods=['POST'], strict_slashes=False)
def create_contact():
    """
    Creates a new contact
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Not a JSON"}), 400
    name = data.get('name')
    if not name:
        return jsonify({"error": "Missing name"}), 400
    email = data.get('email')
    if not email:
        return jsonify({"error": "Missing email"}), 400

    contact = Contact(**data)
    storage.new(contact)
    storage.save()
    return jsonify(contact.to_dict()), 201

