# controllers/auth.py
from flask_login import LoginManager, UserMixin
from models.database import Pessoa  

login_manager = LoginManager()
login_manager.login_view = 'routes.login'

class User(UserMixin):
    pass

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def create_user_from_pessoa(pessoa):
    user = User()
    user.id = pessoa.id
    return user
