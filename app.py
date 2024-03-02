from flask import Flask
from controllers.auth import login_manager
from controllers.routes import routes_blueprint
from models.database import db
import os
import secrets

app = Flask(__name__, template_folder='views')

app.secret_key = secrets.token_hex(16)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

dir = os.path.abspath(os.path.dirname(__file__))
db_file_path = os.path.join(dir, 'models', 'preencheAqui.sqlite3')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_file_path

login_manager.init_app(app)

db.init_app(app)
app.register_blueprint(routes_blueprint)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(host='localhost', port=5000, debug=True)
