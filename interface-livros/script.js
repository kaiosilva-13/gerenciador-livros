const API_URL = 'http://localhost:3000/livros';

// ALTERAÇÃO: Agora a função aceita receber uma URL customizada com filtros por parâmetro
async function carregarLivros(urlDestino = API_URL) {
    try {
        const resposta = await fetch(urlDestino);
        const livros = await resposta.json();
        const container = document.getElementById('lista-livros');
        container.innerHTML = '';
        
        if (livros.length === 0) {
            container.innerHTML = '<p>Nenhum livro encontrado.</p>';
            return;
        }
        
        livros.forEach(livro => {
            const div = document.createElement('div');
            div.className = 'livro-card';
            const statusTexto = livro.isEmprestado ? 'Emprestado' : 'Disponível';
            
            div.innerHTML = `
                <div class="livro-info">
                    <strong>${livro.titulo}</strong> - ${livro.autor} (${livro.categoria})
                    <br><small>Status: ${statusTexto} | Ano: ${livro.anoPublicacao}</small>
                </div>
                <div class="livro-acoes">
                    <button class="btn-patch" onclick="alternarStatus(${livro.id}, ${livro.isEmprestado})">Alternar Status</button>
                    <button class="btn-delete" onclick="deletarLivro(${livro.id})">Deletar</button>
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
        anoPublicacao: Number(document.getElementById('anoPublicacao').value)
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
        carregarLivros(); // Recarrega a lista padrão limpa
    } catch (erro) {
        alert(erro.message);
    }
});

// ALTERAÇÃO: Mapeamento da função que lê os filtros do seu HTML
function filtrarLivros() {
    const campoAutor = document.getElementById('filtro-autor');
    const campoCategoria = document.getElementById('filtro-categoria');
    const campoAno = document.getElementById('filtro-ano');

    if (!campoAutor || !campoCategoria || !campoAno) {
        alert("Erro interno: Verifique os IDs dos filtros no HTML.");
        return;
    }

    const autor = campoAutor.value.trim();
    const categoria = campoCategoria.value.trim();
    const ano = campoAno.value.trim();

    const parametros = new URLSearchParams();

    if (autor) parametros.append('autor', autor);
    if (categoria) parametros.append('categoria', categoria);
    if (ano) parametros.append('anoPublicacao', ano);

    const urlFiltrada = parametros.toString() ? `${API_URL}?${parametros.toString()}` : API_URL;
    
    // Dispara o carregamento passando os parâmetros no formato ?categoria=Valor
    carregarLivros(urlFiltrada);
}

// ALTERAÇÃO: Função para limpar a barra de filtros
function limparFiltros() {
    document.getElementById('filtro-autor').value = '';
    document.getElementById('filtro-categoria').value = '';
    document.getElementById('filtro-ano').value = '';
    carregarLivros(API_URL);
}

// Alternar status de empréstimo (PATCH)
async function alternarStatus(id, statusAtual) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
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
        const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        
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

document.addEventListener('DOMContentLoaded', () => carregarLivros());