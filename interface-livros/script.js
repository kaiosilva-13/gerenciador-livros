const API_URL = 'https://gerenciador-livros-interface.onrender.com/livros';

// Guarda o ID do livro aberto na mini janela de edição
let idLivroNoModal = null;

// =========================================================================
// 1. CARREGAR E RENDERIZAR LIVROS (GET)
// =========================================================================
async function carregarLivros() {
    try {
        const resposta = await fetch(API_URL);
        
        if (!resposta.ok) throw new Error('Não foi possível obter os dados da API.');
        
        const livros = await resposta.json();
        renderizarLista(livros);
    } catch (erro) {
        alert('Erro ao carregar acervo: ' + erro.message);
    }
}

function renderizarLista(lista, mensagemVazia = '<p>Nenhum livro cadastrado.</p>') {
    const container = document.getElementById('lista-livros');
    container.innerHTML = ''; 

    if (lista.length === 0) {
        container.innerHTML = mensagemVazia;
        return;
    }

    lista.forEach(livro => {
        const div = document.createElement('div');
        div.className = 'livro-card';
        
        // Converte o objeto livro para string segura para injetar como parâmetro HTML
        const livroJson = JSON.stringify(livro).replace(/"/g, '&quot;');
        
        div.innerHTML = `
            <div class="livro-info">
                <strong>${livro.titulo}</strong> - ${livro.autor} (${livro.categoria})
                <br><small>Ano: ${livro.anoPublicacao}</small>
            </div>
            <div class="livro-acoes">
                <!-- Botão Editar: Abre o modal carregando os dados deste livro -->
                <button class="btn-patch" onclick="abrirModal(${livroJson})">Editar</button>
                <button class="btn-delete" onclick="deletarLivro(${livro.id})">Deletar</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// =========================================================================
// 2. FILTRAR ACERVO (Busca inteligente por iniciais)
// =========================================================================
async function filtrarLivros() {
    const campoTitulo = document.getElementById('filtro-titulo');
    const campoAutor = document.getElementById('filtro-autor');
    const campoCategoria = document.getElementById('filtro-categoria');
    const campoAno = document.getElementById('filtro-ano');

    if (!campoTitulo || !campoAutor || !campoCategoria || !campoAno) return;

    // Remove espaços vazios e padroniza a busca em letras minúsculas
    const tituloFiltro = campoTitulo.value.trim().toLowerCase();
    const autorFiltro = campoAutor.value.trim().toLowerCase();
    const categoriaFiltro = campoCategoria.value.trim().toLowerCase();
    const anoFiltro = campoAno.value.trim();

    try {
        const resposta = await fetch(API_URL);
        const todosLivros = await resposta.json();
        
        const livrosFiltrados = todosLivros.filter(livro => {
            // Verifica se o valor cadastrado começa com o termo inserido (.startsWith)
            const bateTitulo = tituloFiltro ? livro.titulo.toLowerCase().trim().startsWith(tituloFiltro) : true;
            const bateAutor = autorFiltro ? livro.autor.toLowerCase().trim().startsWith(autorFiltro) : true;
            const bateCategoria = categoriaFiltro ? livro.categoria.toLowerCase().trim().startsWith(categoriaFiltro) : true;
            const bateAno = anoFiltro ? Number(livro.anoPublicacao) === Number(anoFiltro) : true;
            
            return bateTitulo && bateAutor && bateCategoria && bateAno;
        });

        renderizarLista(livrosFiltrados, '<p>Nenhum livro encontrado para essa busca.</p>');
    } catch (erro) {
        alert('Erro ao filtrar livros.');
    }
}

function limparFiltros() {
    document.getElementById('filtro-titulo').value = '';
    document.getElementById('filtro-autor').value = '';
    document.getElementById('filtro-categoria').value = '';
    document.getElementById('filtro-ano').value = '';
    carregarLivros(); 
}

// =========================================================================
// 3. CONTROLE DA MINI JANELA (MODAL)
// =========================================================================
function abrirModal(livro) {
    // Preenche as informações atuais nos inputs do modal para que o usuário possa alterar
    document.getElementById('edit-titulo').value = livro.titulo;
    document.getElementById('edit-autor').value = livro.autor;
    document.getElementById('edit-categoria').value = livro.categoria;
    document.getElementById('edit-ano').value = livro.anoPublicacao;
    
    // Vincula o ID do livro em edição à variável global de controle
    idLivroNoModal = livro.id;
    
    // Altera a classe CSS para deixar o modal visível na tela
    document.getElementById('modal-edicao').className = 'modal-visivel';
}

function fecharModal() {
    // Retorna a classe que oculta o modal e reseta o ID monitorado
    document.getElementById('modal-edicao').className = 'modal-oculto';
    idLivroNoModal = null;
}

// Evento disparado quando o usuário clica em "Salvar Alterações" dentro do modal
document.getElementById('form-editar').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const dadosAtualizados = {
        titulo: document.getElementById('edit-titulo').value.trim(),
        autor: document.getElementById('edit-autor').value.trim(),
        categoria: document.getElementById('edit-categoria').value.trim(),
        anoPublicacao: Number(document.getElementById('edit-ano').value)
    };
    
    try {
        const resposta = await fetch(`${API_URL}/${idLivroNoModal}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizados)
        });
        
        if (!resposta.ok) {
            const erroData = await resposta.json();
            throw new Error(erroData.message || 'Erro ao processar atualização no servidor.');
        }
        
        fecharModal(); // Fecha a mini janela
        await carregarLivros(); // Força a atualização da listagem (GET)
    } catch (erro) {
        alert('Não foi possível salvar as alterações: ' + erro.message);
    }
});

// =========================================================================
// 4. CADASTRAR NOVO LIVRO (Formulário Principal)
// =========================================================================
document.getElementById('form-livro').addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    const dados = {
        titulo: document.getElementById('titulo').value.trim(),
        autor: document.getElementById('autor').value.trim(),
        categoria: document.getElementById('categoria').value.trim(),
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
            throw new Error(erroData.message || 'Verifique as validações dos dados inseridos.');
        }
        
        document.getElementById('form-livro').reset(); // Reseta os campos do form principal
        await carregarLivros(); // Atualiza a listagem (GET) imediatamente
    } catch (erro) {
        alert('Falha ao cadastrar: ' + erro.message);
    }
});

// =========================================================================
// 5. REMOVER REGISTRO (DELETE)
// =========================================================================
async function deletarLivro(id) {
    if (!confirm('Deseja mesmo remover este livro?')) return;
    try {
        const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        
        if (resposta.ok || resposta.status === 204) {
            await carregarLivros();
        } else {
            const erroData = await resposta.json();
            throw new Error(erroData.message || 'Erro na requisição.');
        }
    } catch (erro) {
        alert('Erro ao deletar: ' + erro.message);
    }
}

// Escuta o carregamento total do DOM para inicializar os cards de livros na tela
document.addEventListener('DOMContentLoaded', carregarLivros);