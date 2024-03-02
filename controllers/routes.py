import sys
import os

current_dir = os.path.dirname(os.path.abspath(__file__))

sys.path.append(os.path.join(current_dir, '..'))

from flask import Flask, render_template, request, url_for, redirect, flash, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from flask import current_app as app
from models.database import db, Pessoa
from datetime import datetime

class User(UserMixin):
    pass

# Página de login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']
        
        pessoa = Pessoa.query.filter_by(email=email).first()
        if pessoa and check_password_hash(pessoa.senha, senha):  
            user = User()
            user.id = pessoa.id
            login_user(user)
            flash('Login realizado com sucesso!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Email ou senha inválidos. Verifique suas credenciais e tente novamente.', 'error')

    return render_template('index.html')

# Rota para a página Dash
@app.route('/dashboard', methods=['GET'])
def dashboard():
    pessoas_list = Pessoa.query.all()
    return render_template('dash.html', pessoas=pessoas_list)

@app.route('/api/pessoas')
def obter_pessoas():
    pessoas = Pessoa.query.all()
    return jsonify([{
        'id': pessoa.id,
        'nome': pessoa.nomeCompleto,
        'cpf': pessoa.cpf,
        'dataNascimento': pessoa.dataNascimento.strftime('%d/%m/%Y'),
    } for pessoa in pessoas])

#Create
@app.route('/salvar', methods=['POST'])
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

    senha_hash = generate_password_hash(senha, method='sha256')

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
    return redirect(url_for('login'))

#Read
@app.route('/pessoas/<int:id>', methods=['GET'])
def pessoa_detalhes(id):
    pessoa = Pessoa.query.get(id)
    return render_template('dash.html', pessoa=pessoa)

#Update
@app.route('/editpessoa/<int:id>', methods=['GET', 'POST'])
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
        db.session.commit()
        flash('Dados da pessoa atualizados com sucesso!', 'success')
        return redirect(url_for('dashboard'))  
    return render_template('cadastro.html', pessoa=pessoa)


# Delete
@app.route('/deletepessoa/<int:id>', methods=['GET'])
def excluir_pessoa(id):
    pessoa = Pessoa.query.get(id)
    db.session.delete(pessoa)
    db.session.commit()
    flash('Pessoa removida com sucesso!', 'success')
    return redirect(url_for('dashboard'))

