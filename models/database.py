from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Pessoa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nomeCompleto = db.Column(db.String(255))
    dataNascimento = db.Column(db.Date)
    idade = db.Column(db.Integer)
    cpf = db.Column(db.String(20), unique=True)
    email = db.Column(db.String(255))
    telefone = db.Column(db.String(20))
    estadoCivil = db.Column(db.String(50))
    endereco = db.Column(db.String(255))
    cep = db.Column(db.String(10))

    def __init__(self, nomeCompleto, dataNascimento, idade, cpf, email, telefone, estadoCivil, endereco, cep):
        self.nomeCompleto = nomeCompleto
        self.dataNascimento = dataNascimento
        self.idade = idade
        self.cpf = cpf
        self.email = email
        self.telefone = telefone
        self.estadoCivil = estadoCivil
        self.endereco = endereco
        self.cep = cep