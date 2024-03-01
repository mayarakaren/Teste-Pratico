from flask import Flask, render_template, request, redirect, url_for
import sqlite3
import os

app = Flask(__name__)
template_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../frontend/templates'))
app.template_folder = template_dir

DATABASE = 'preencheAqui.db'

def create_table():
    with sqlite3.connect(DATABASE) as connection:
        cursor = connection.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS pessoas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nomeCompleto TEXT,
                dataNascimento DATE,
                idade INTEGER,
                cpf TEXT,
                email TEXT,
                telefone TEXT,
                estadoCivil TEXT,
                endereco TEXT,
                cep TEXT
            )
        ''')

create_table()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/salvar', methods=['POST'])
def salvar():
    if request.method == 'POST':
        dados_formulario = request.form
        salvar_no_banco(dados_formulario)
    return redirect(url_for('index'))

def salvar_no_banco(dados_formulario):
    with sqlite3.connect(DATABASE) as connection:
        cursor = connection.cursor()
        cursor.execute('''
            INSERT INTO pessoas (nomeCompleto, dataNascimento, idade, cpf, email, telefone, estadoCivil, endereco, cep)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            dados_formulario['nomeCompleto'],
            dados_formulario['dataNascimento'],
            dados_formulario['idade'],
            dados_formulario['cpf'],
            dados_formulario['email'],
            dados_formulario['telefone'],
            dados_formulario['estadoCivil'],
            dados_formulario['endereco'],
            dados_formulario['cep']
        ))
        connection.commit()

if __name__ == '__main__':
    app.run(debug=True)