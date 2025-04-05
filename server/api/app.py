"""
Flask REST API Application
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
from server.api.views import api_views

app = Flask(__name__)
app.register_blueprint(api_views, url_prefix='/api')
CORS(app)
# app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True


@app.errorhandler(404)
def not_found(error=None):
    """
    Handle 404 errors
    """
    return jsonify({"error": "Not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5001', debug=True)
