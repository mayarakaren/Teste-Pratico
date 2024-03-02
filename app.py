from flask import Flask, LoginManager
from controllers import routes
from models.database import db
import os

app = Flask(__name__, template_folder='views')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

dir = os.path.abspath(os.path.dirname(__file__))
db_file_path = os.path.join(dir, 'models', 'preencheAqui.sqlite3')

if not os.path.exists(db_file_path):
    os.makedirs(os.path.join(dir, 'models'))
    open(db_file_path, 'w').close()

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_file_path

login_manager = LoginManager()

db.init_app(app)

if __name__ == '__main__':
    with app.app_context():
        login_manager.init_app(app)

        db.create_all()

    app.run(host='localhost', port=5000, debug=True)
    routes.init_app(app)
