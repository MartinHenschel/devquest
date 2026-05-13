const assert = require('assert');
const repo = require('./repository');

console.log("🚀 Iniciando Testes Unitários...");

// Teste 1: Cadastro de Usuário
try {
    repo.limparDados();
    const user = repo.adicionarUsuario("Martin", "martin@test.com", "123");
    assert.strictEqual(user.nome, "Martin");
    assert.strictEqual(repo.buscarUsuarioPorEmail("martin@test.com").id, 1);
    console.log("✅ Teste Cadastro: PASSOU");
} catch (e) {
    console.error("❌ Teste Cadastro: FALHOU", e.message);
}

// Teste 2: Buscar Pergunta Existente
try {
    const pergunta = repo.buscarPerguntaPorId(1);
    assert.strictEqual(pergunta.id, 1);
    assert.ok(pergunta.pergunta.includes("variável"));
    console.log("✅ Teste Busca Pergunta: PASSOU");
} catch (e) {
    console.error("❌ Teste Busca Pergunta: FALHOU", e.message);
}

console.log("\n--- Resultado Final: Testes concluídos ---");
