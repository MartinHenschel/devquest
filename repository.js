let usuarios = [];
let perguntas = [
  { id: 1, pergunta: "O que é uma variável?", opcoes: ["Loop","Armazenar dados","Erro","Saída"], respostaCorreta: 1 },
  // ... coloque as outras perguntas aqui se desejar
];

const QuizRepository = {
    // CRUD de Usuários
    adicionarUsuario: (nome, email, senha) => {
        const novo = { id: usuarios.length + 1, nome, email, senha, xp: 0 };
        usuarios.push(novo);
        return novo;
    },
    buscarUsuarioPorEmail: (email) => usuarios.find(u => u.email === email),
    
    // CRUD de Perguntas
    buscarPerguntaPorId: (id) => perguntas.find(p => p.id === id),
    listarTodasPerguntas: () => perguntas,
    
    // Reset para Testes
    limparDados: () => { usuarios = []; }
};

module.exports = QuizRepository;