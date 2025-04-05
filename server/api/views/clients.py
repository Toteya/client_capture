"""
API views related to the client data
"""
from flask import jsonify, request
from server.models import storage
from server.models.client import Client
from server.api.views import api_views

@api_views.route('/clients', methods=['GET'], strict_slashes=False)
def get_clients():
    """
    Retrieves the list of all Client objects
    """
    clients = storage.all(Client)
    client_list = [client.to_dict() for client in clients.values()]
    return jsonify(client_list)

@api_views.route('/clients/<client_id>', methods=['GET'], strict_slashes=False)
def get_client(client_id):
    """
    Retrieves a Client object by its ID
    """
    client = storage.get(Client, client_id)
    if not client:
        return jsonify({"error": "Client not found"}), 404
    return jsonify(client.to_dict())

@api_views.route('/clients', methods=['POST'], strict_slashes=False)
def create_client():
    """
    Creates a new Client object
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Not a JSON"}), 400
    name = data.get('name')
    if not name:
        return jsonify({"error": "Missing name"}), 400
    client_code = data.get('client_code')
    if not client_code:
        return jsonify({"error": "Missing client_code"}), 400

    client = Client(name=name, client_code=client_code)
    client.save()
    client.name
    return jsonify(client.to_dict()), 201
  
@api_views.route('/clients/<client_id>', methods=['DELETE'], strict_slashes=False)
def delete_client(client_id):
    """
    Deletes a Client object by its ID
    """
    client = storage.get(Client, client_id)
    if not client:
        return jsonify({"error": "Client not found"}), 404
    client.delete()
    storage.close()
    return jsonify({}), 200
