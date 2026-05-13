const express = require('express');
const cors = require('cors');
const repo = require('./repository');

const app = express();

app.use(express.json());
app.use(cors());

let usuarios = [];

let perguntas = [
  { id: 1, pergunta: "O que é uma variável?", opcoes: ["Loop","Armazenar dados","Erro","Saída"], respostaCorreta: 1 },
  { id: 2, pergunta: "O que é JavaScript?", opcoes: ["Banco","Linguagem","Sistema","Hardware"], respostaCorreta: 1 },
  { id: 3, pergunta: "Comentário em JS?", opcoes: ["//","**","##","<!-- -->"], respostaCorreta: 0 },
  { id: 4, pergunta: "O que é loop?", opcoes: ["Condição","Repetição","Erro","Variável"], respostaCorreta: 1 },
  { id: 5, pergunta: "Tipo de dado?", opcoes: ["if","for","string","return"], respostaCorreta: 2 },
  { id: 6, pergunta: "O que o if faz?", opcoes: ["Repete","Cria","Condição","Mostra"], respostaCorreta: 2 },
  { id: 7, pergunta: "Mostrar no console?", opcoes: ["print()","console.log()","echo()","write()"], respostaCorreta: 1 },
  { id: 8, pergunta: "O que é função?", opcoes: ["Variável","Código reutilizável","Erro","Banco"], respostaCorreta: 1 },
  { id: 9, pergunta: "Operador de comparação?", opcoes: ["=","==","+","*"], respostaCorreta: 1 },
  { id: 10, pergunta: "O que é API?", opcoes: ["Sistema","Interface de aplicações","Banco","Código"], respostaCorreta: 1 }
];

// cadastro
app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.json({ mensagem: "Preencha todos os campos!" });
  }

  const existe = usuarios.find(u => u.email === email);
  if (existe) {
    return res.json({ mensagem: "Email já cadastrado!" });
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
    senha,
    xp: 0
  }

  usuarios.push(novoUsuario);

  res.json({ mensagem: "Cadastro realizado com sucesso!" });
});

// login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const usuario = usuarios.find(
    u => u.email === email && u.senha === senha
  );

  if (usuario) {
    res.json({ mensagem: "Login ok", usuario });
  } else {
    res.status(401).json({ mensagem: "Email ou senha inválidos" });
  }
});

// perguntas (aleatórias)
app.get('/perguntas', (req, res) => {
  const embaralhadas = [...perguntas].sort(() => Math.random() - 0.5);
  res.json(embaralhadas);
});

// responder
app.post('/responder', (req, res) => {
  const { usuarioId, perguntaId, resposta } = req.body;

  const usuario = usuarios.find(u => u.id === usuarioId);
  const pergunta = perguntas.find(p => p.id === perguntaId);

  if (!usuario || !pergunta) {
    return res.status(404).json({ mensagem: "Erro" });
  }

  if (resposta === pergunta.respostaCorreta) {
    usuario.xp += 10;
    return res.json({ mensagem: "Resposta correta!", xp: usuario.xp });
  } else {
    return res.json({ mensagem: "Resposta errada!", xp: usuario.xp });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});