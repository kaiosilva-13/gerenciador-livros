const API_URL = 'http://localhost:3000/livros';
// Carregar livros do servidor
async function carregarLivros() {
    try {
        const resposta = await fetch(API_URL);
        const livros = await resposta.json();
        const container = document.getElementById('lista-livros');
        container.innerHTML = '';
        if (livros.length === 0) {
            container.innerHTML = '<p>Nenhum livro cadastrado.</p>';
            return;
        }
        livros.forEach(livro => {
            const div = document.createElement('div');
            div.className = 'livro-card';
            const statusTexto = livro.isEmprestado ? 'Emprestado' : 'Disponível';
            div.innerHTML = `
                <div class="livro-info">
                    <strong>\${livro.titulo}</strong> - \${livro.autor} (\$
{livro.categoria})
                    <small>Status: \${statusTexto}</small>
                </div>
                <div class="livro-acoes">
                    <button class="btn-patch" onclick="alternarStatus(\${livro.id}, \
${livro.isEmprestado})">Alternar Status</button>
                    <button class="btn-delete" onclick="deletarLivro(\$
{livro.id})">Deletar</button>
                </div>
            `;
            container.appendChild(div);
        });
    } catch (erro) {
        alert('Erro ao buscar livros do servidor.');
    }
}
// Evento de submissão do formulário (Criar Livro)
document.getElementById('form-livro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        categoria: document.getElementById('categoria').value,
        anoPublicacao: document.getElementById('anoPublicacao').value || undefined
    };
    try {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        if (!resposta.ok) {
            const erroData = await resposta.json();
            throw new Error(erroData.message || 'Erro ao criar livro');
        }
        document.getElementById('form-livro').reset();
        carregarLivros();
    } catch (erro) {
        alert(erro.message);
    }
});
// Alternar status de empréstimo (PATCH)
async function alternarStatus(id, statusAtual) {
    try {
        const resposta = await fetch(`\${API_URL}/\${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isEmprestado: !statusAtual })
        });
        if (!resposta.ok) {
            const erroData = await resposta.json();
            throw new Error(erroData.message || 'Erro ao alternar status');
        }
        carregarLivros();
    } catch (erro) {
        alert(erro.message || 'Não foi possível atualizar o status.');
    }
}
// Deletar um livro (DELETE)
async function deletarLivro(id) {
    if (!confirm('Deseja mesmo remover este livro?')) return;
    try {
        const resposta = await fetch(`\${API_URL}/\${id}`, { method: 'DELETE' });
        if (resposta.status === 204 || resposta.ok) {
            carregarLivros();
        } else {
            const erroData = await resposta.json();
            alert(erroData.message || 'Erro ao deletar');
        }
    } catch (erro) {
        alert('Erro ao conectar com o servidor.');
    }
}
// Inicialização automática ao carregar a página
document.addEventListener('DOMContentLoaded', carregarLivros);