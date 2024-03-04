# PreencheAqui - Sistema de Cadastro de Dados Pessoais

## Descrição do Projeto
O PreencheAqui é um sistema avançado de gestão pessoal desenvolvido com Python utilizando o framework Flask, juntamente com tecnologias como HTML, CSS e JavaScript. Esse projeto foi idealizado para fornecer uma solução abrangente de cadastro e gerenciamento de dados pessoais, proporcionando uma experiência eficiente e amigável ao usuário.

## Requisitos do Sistema
### Linguagem de Programação
- Python (Flask)

### Banco de Dados
- SQLite (utilizado no exemplo, mas pode ser adaptado para outros)

### Campos Obrigatórios
1. Nome Completo
2. Data de Nascimento
3. CPF (com validação e máscara)
4. Email (com validação)
5. Telefone (com máscara)
6. Estado Civil
7. Endereço
8. CEP (com validação e máscara)
9. Idade (Calculada a partir da data de nascimento)

### Funcionalidades
- Botão "SALVAR" para gravar os dados
- Botão "CANCELAR" para limpar o formulário
- Cadastro de usuários com login e senha
- Atualização e exclusão de dados
- Dashboard com visão geral dos cadastros
- API REST para obter dados

### Execução do Projeto
1. Clone o repositório:
   ```bash
   https://github.com/mayarakaren/Teste-Pratico.git
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd Teste-Pratico
   ```

3. Instale as dependências do Python (certifique-se de ter o Python e o pip instalados):
   ```bash
   pip install -r requirements.txt
   ```

4. Execute o aplicativo Flask:
   ```bash
   python app.py
   ```

5. Abra seu navegador e acesse `http://127.0.0.1:5000/`

## Tecnologias Utilizadas
- HTML
- CSS
- JavaScript
- Python
- Flask
- SQLAlchemy (para integração com banco de dados)

## Estrutura do Projeto
- `src/`: Contém arquivos como CSS e JavaScript.
- `templates/`: Armazena os arquivos HTML.
- `app.py`: Arquivo principal do Flask.
- `models/`: Contém os modelos de dados para o SQLAlchemy.

## Licença
Este projeto está sob a licença [MIT](LICENSE).
