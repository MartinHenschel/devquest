const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const promBundle = require('express-prom-bundle');

const Usuario = require('./models/Usuario');

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DevQuest API',
      version: '1.0.0',
      description: 'API do sistema DevQuest'
    }
  },
  apis: ['./server.js']
};

const swaggerSpec = swaggerJsdoc(options);

mongoose.connect('mongodb+srv://martinhensilva_db_user:123456dev@cluster0.ouvo9rg.mongodb.net/?appName=Cluster0')
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log(err));

app.use(express.json());
app.use(cors());

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  promClient: {
    collectDefaultMetrics: {}
  }
});

app.use(metricsMiddleware);

app.use(metricsMiddleware);

app.use(express.static('public'));

let perguntas = [
  {
    id: 1,
    pergunta: "O que é uma variável?",
    opcoes: ["Loop","Armazenar dados","Erro","Saída"],
    respostaCorreta: 1
  },
  {
    id: 2,
    pergunta: "O que é JavaScript?",
    opcoes: ["Banco","Linguagem","Sistema","Hardware"],
    respostaCorreta: 1
  },
  {
    id: 3,
    pergunta: "Comentário em JS?",
    opcoes: ["//","**","##","<!-- -->"],
    respostaCorreta: 0
  },
  {
    id: 4,
    pergunta: "O que é loop?",
    opcoes: ["Condição","Repetição","Erro","Variável"],
    respostaCorreta: 1
  },
  {
    id: 5,
    pergunta: "Tipo de dado?",
    opcoes: ["if","for","string","return"],
    respostaCorreta: 2
  },
  {
    id: 6,
    pergunta: "O que o if faz?",
    opcoes: ["Repete","Cria","Condição","Mostra"],
    respostaCorreta: 2
  },
  {
    id: 7,
    pergunta: "Mostrar no console?",
    opcoes: ["print()","console.log()","echo()","write()"],
    respostaCorreta: 1
  },
  {
    id: 8,
    pergunta: "O que é função?",
    opcoes: ["Variável","Código reutilizável","Erro","Banco"],
    respostaCorreta: 1
  },
  {
    id: 9,
    pergunta: "Operador de comparação?",
    opcoes: ["=","==","+","*"],
    respostaCorreta: 1
  },
  {
    id: 10,
    pergunta: "O que é API?",
    opcoes: ["Sistema","Interface de aplicações","Banco","Código"],
    respostaCorreta: 1
  }
];

// CADASTRO
app.post('/cadastro', async (req, res) => {

  const { nome, email, senha } = req.body;

  try {

    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({
        mensagem: 'Email já cadastrado'
      });
    }

    const novoUsuario = new Usuario({
      nome,
      email,
      senha
    });

    await novoUsuario.save();

    res.json({
      mensagem: 'Usuário cadastrado com sucesso'
    });

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao cadastrar usuário'
    });

  }

// DELETAR USUÁRIO
app.delete('/usuarios/:id', async (req, res) => {

  try {

    await Usuario.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensagem: 'Usuário removido'
    });

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao remover usuário'
    });

  }

});

});

// LISTAR USUÁRIOS
app.get('/usuarios', async (req, res) => {

  try {

    const usuarios = await Usuario.find();

    res.json(usuarios);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao buscar usuários'
    });

  }

});

// EDITAR USUÁRIO
app.put('/usuarios/:id', async (req, res) => {

  const { nome, email, senha } = req.body;

  try {

    const usuarioAtualizado =
      await Usuario.findByIdAndUpdate(

        req.params.id,

        {
          nome,
          email,
          senha
        },

        { new: true }

      );

    res.json(usuarioAtualizado);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao atualizar usuário'
    });

  }

});

// LOGIN
app.post('/login', async (req, res) => {

  const { email, senha } = req.body;

  try {

    const usuario = await Usuario.findOne({
      email,
      senha
    });

    if (usuario) {

      res.json({
        mensagem: "Login ok",
        usuario
      });

    } else {

      res.status(401).json({
        mensagem: "Email ou senha inválidos"
      });

    }

  } catch (erro) {

    res.status(500).json({
      mensagem: "Erro no login"
    });

  }

});

/**
 * @swagger
 * /perguntas:
 *   get:
 *     summary: Lista todas as perguntas
 *     responses:
 *       200:
 *         description: Lista de perguntas
 */

// LISTAR PERGUNTAS
app.get('/perguntas', (req, res) => {

  const embaralhadas =
    [...perguntas].sort(() => Math.random() - 0.5);

  res.json(embaralhadas);

});

// CRIAR PERGUNTA
app.post('/perguntas', (req, res) => {

  const novaPergunta = req.body;

  perguntas.push(novaPergunta);

  res.json({
    mensagem: 'Pergunta criada'
  });

});

// EDITAR PERGUNTA
app.put('/perguntas/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const pergunta = perguntas.find(
    p => p.id === id
  );

  if (!pergunta) {

    return res.status(404).json({
      mensagem: 'Pergunta não encontrada'
    });

  }

  pergunta.pergunta = req.body.pergunta;
  pergunta.opcoes = req.body.opcoes;
  pergunta.respostaCorreta = req.body.respostaCorreta;

  res.json({
    mensagem: 'Pergunta atualizada'
  });

});

// DELETAR PERGUNTA
app.delete('/perguntas/:id', (req, res) => {

  const id = parseInt(req.params.id);

  perguntas = perguntas.filter(
    p => p.id !== id
  );

  res.json({
    mensagem: 'Pergunta removida'
  });

});

// RESPONDER
app.post('/responder', async (req, res) => {

  const { usuarioId, perguntaId, resposta } = req.body;

  try {

    const usuario = await Usuario.findById(usuarioId);

    const pergunta = perguntas.find(
      p => p.id === perguntaId
    );

    if (!usuario || !pergunta) {

      return res.status(404).json({
        mensagem: "Erro"
      });

    }

    if (resposta === pergunta.respostaCorreta) {

      usuario.xp += 10;

      await usuario.save();

      return res.json({
        mensagem: "Resposta correta!",
        xp: usuario.xp
      });

    } else {

      return res.json({
        mensagem: "Resposta errada!",
        xp: usuario.xp
      });

    }

  } catch (erro) {

    res.status(500).json({
      mensagem: "Erro ao responder"
    });

  }

});

// RANKING
app.get('/ranking', async (req, res) => {

  try {

    const ranking = await Usuario.find()
      .sort({ xp: -1 });

    res.json(ranking);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao carregar ranking'
    });

  }

});

app.use('/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});