import sys
import os

current_dir = os.path.dirname(os.path.abspath(__file__))

sys.path.append(os.path.join(current_dir, '..'))

from flask import Flask
from flask import Blueprint, render_template, request, url_for, redirect, flash, jsonify, current_app
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from controllers.auth import create_user_from_pessoa
from flask_login import UserMixin
from flask import current_app as app
from models.database import db, Pessoa
from datetime import datetime

routes_blueprint = Blueprint('routes', __name__)

class User(UserMixin):
    pass

class User(UserMixin):
    def __init__(self, id):
        self.id = id

@routes_blueprint.route('/')
def index():
    return render_template('index.html')

# Página de login
@routes_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']
        
        pessoa = Pessoa.query.filter_by(email=email).first()
        if pessoa and check_password_hash(pessoa.senha, senha):  
            user = create_user_from_pessoa(pessoa)
            login_user(user)
            return redirect(url_for('routes.dashboard'))
        else:
            flash('Email ou senha inválidos. Verifique suas credenciais e tente novamente.', 'error')

    return render_template('index.html')

# Rota para a página Dash
@routes_blueprint.route('/dashboard', methods=['GET'])
def dashboard():
    pessoas_list = Pessoa.query.all()
    return render_template('dash.html', pessoas=pessoas_list)

@routes_blueprint.route('/api/pessoas')
def obter_pessoas():
    pessoas = Pessoa.query.all()
    return jsonify([{
        'id': pessoa.id,
        'nome': pessoa.nomeCompleto,
        'cpf': pessoa.cpf,
        'dataNascimento': pessoa.dataNascimento.strftime('%d/%m/%Y'),
    } for pessoa in pessoas])

@routes_blueprint.route('/cadastrar', methods=['GET'])
def cadastrar():
    return render_template('cadastrar.html')

#Create
from flask import request, render_template, redirect, url_for, flash
from models.database import db, Pessoa
from werkzeug.security import generate_password_hash
from datetime import datetime

@routes_blueprint.route('/salvar', methods=['POST'])
def salvar():
    nomeCompleto = request.form['nomeCompleto']
    dataNascimento = datetime.strptime(request.form['dataNascimento'], '%Y-%m-%d')
    idade = int(request.form['idade'])
    cpf = request.form['cpf']
    email = request.form['email']
    telefone = request.form['telefone']
    estadoCivil = request.form['estadoCivil']
    endereco = request.form['endereco']
    cep = request.form['cep']
    senha = request.form['password']

    existing_pessoa = Pessoa.query.filter_by(cpf=cpf).first()
    if existing_pessoa:
        flash('CPF já cadastrado. Por favor, use um CPF diferente.', 'error')
        return render_template('cadastrar.html', pessoa=existing_pessoa)

    senha_hash = generate_password_hash(senha, method='scrypt')

    nova_pessoa = Pessoa(
        nomeCompleto=nomeCompleto,
        dataNascimento=dataNascimento,
        idade=idade,
        cpf=cpf,
        email=email,
        telefone=telefone,
        estadoCivil=estadoCivil,
        endereco=endereco,
        cep=cep,
        senha=senha_hash
    )

    db.session.add(nova_pessoa)
    db.session.commit()

    flash('Cadastro realizado com sucesso!', 'success')
    return redirect(url_for('routes.login'))

#Read
@routes_blueprint.route('/pessoas/<int:id>', methods=['GET'])
def pessoa_detalhes(id):
    pessoa = Pessoa.query.get(id)
    return render_template('dash.html', pessoa=pessoa)

@routes_blueprint.route('/editpessoa/<int:id>', methods=['GET'])
def edit_pessoa(id):
    pessoa = Pessoa.query.get(id)
    return render_template('editar.html', pessoa=pessoa)
#Update
@routes_blueprint.route('/editpessoa/<int:id>', methods=['GET', 'POST'])
def editar_pessoa(id):
    pessoa = Pessoa.query.get(id)
    if request.method == 'POST':
        pessoa.nomeCompleto = request.form['nomeCompleto']
        pessoa.dataNascimento = datetime.strptime(request.form['dataNascimento'], '%Y-%m-%d')
        pessoa.idade = int(request.form['idade'])
        pessoa.cpf = request.form['cpf']
        pessoa.email = request.form['email']
        pessoa.telefone = request.form['telefone']
        pessoa.estadoCivil = request.form['estadoCivil']
        pessoa.endereco = request.form['endereco']
        pessoa.cep = request.form['cep']
        pessoa.senha = request.form['password']  
        db.session.commit()
        flash('Dados da pessoa atualizados com sucesso!', 'success')
        return redirect(url_for('routes.dashboard')) 


# Delete
@routes_blueprint.route('/deletepessoa/<int:id>', methods=['GET'])
def excluir_pessoa(id):
    pessoa = Pessoa.query.get(id)
    db.session.delete(pessoa)
    db.session.commit()
    flash('Pessoa removida com sucesso!', 'success')
    return redirect(url_for('routes.dashboard'))

