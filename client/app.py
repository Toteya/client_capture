"""
A Flask web application that captures and displays the client information
"""
from flask import render_template
from flask import Flask
from server.models import storage
from server.models.client import Client

app = Flask(__name__)


@app.route('/clients')
def clients():
    """
    Render the client information page
    """
    clients = storage.all(Client).values()
    clients = sorted(clients, key=lambda k: k.name)
    return render_template('clients.html', clients=clients)

@app.route('/contacts')
def contacts():
    """
    Render the contacts page
    """
    return render_template('contacts.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
