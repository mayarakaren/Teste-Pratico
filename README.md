# PreencheAqui - Sistema de Cadastro de Dados Pessoais

## Descrição do Projeto
O PreencheAqui é um sistema simples de cadastro de dados pessoais desenvolvido utilizando HTML, CSS, JavaScript e Python com Flask. O objetivo é coletar informações básicas sobre uma pessoa e armazená-las em algum lugar, seja um banco de dados, planilha eletrônica, bloco de notas, etc.

## Requisitos do Sistema
### Linguagem de Programação
- Livre

### Banco de Dados
- Livre

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

### Execução do Projeto
1. Clone o repositório:
   ```bash
   git clone https://github.com/mayarakaren/Teste-Pratico.git
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

## Estrutura do Projeto
- `src/`: Contém arquivos como CSS e JavaScript.
- `templates/`: Armazena os arquivos HTML.
- `app.py`: Arquivo principal do Flask.

## Licença
Este projeto está sob a licença [MIT](LICENSE).
