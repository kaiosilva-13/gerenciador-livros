const API_URL = 'http://localhost:3000/livros';

// =========================================================================
// 1. CARREGAR LIVROS (Busca a lista completa do servidor ao iniciar)
// =========================================================================
async function carregarLivros() {
    try {
        // Faz a requisição GET para a API do NestJS
        const resposta = await fetch(API_URL);
        const livros = await resposta.json();
        
        // Renderiza todos os livros retornados na tela
        renderizarLista(livros);
    } catch (erro) {
        alert('Erro ao buscar livros do servidor.');
    }
}

// =========================================================================
// 2. FILTRAR LIVROS (Busca inteligente por iniciais no Front-end)
// =========================================================================
async function filtrarLivros() {
    const campoAutor = document.getElementById('filtro-autor');
    const campoCategoria = document.getElementById('filtro-categoria');
    const campoAno = document.getElementById('filtro-ano');

    // Validação de segurança para garantir que os elementos existem no HTML
    if (!campoAutor || !campoCategoria || !campoAno) {
        alert("Erro interno: Verifique os IDs dos filtros no HTML.");
        return;
    }

    // Captura os valores digitados, remove espaços extras (.trim) e padroniza em minúsculo (.toLowerCase)
    const autorFiltro = campoAutor.value.trim().toLowerCase();
    const categoriaFiltro = campoCategoria.value.trim().toLowerCase();
    const anoFiltro = campoAno.value.trim();

    try {
        // Busca o acervo completo do NestJS para realizar o filtro localmente
        const resposta = await fetch(API_URL);
        const todosLivros = await resposta.json();
        
        // Filtra a lista com base nas regras de iniciais e igualdade
        const livrosFiltrados = todosLivros.filter(livro => {
            
            // REGRA DO AUTOR: 
            // Se o usuário digitou algo, verifica se o autor salvo COMEÇA COM (.startsWith) as letras digitadas.
            // Se o filtro estiver vazio, esta regra é ignorada (retorna true).
            const bateAutor = autorFiltro 
                ? livro.autor.toLowerCase().trim().startsWith(autorFiltro) 
                : true;

            // REGRA DA CATEGORIA:
            // Segue a mesma lógica do autor: verifica se a categoria cadastrada COMEÇA COM o termo pesquisado.
            const bateCategoria = categoriaFiltro 
                ? livro.categoria.toLowerCase().trim().startsWith(categoriaFiltro) 
                : true;

            // REGRA DO ANO:
            // Por se tratar de um número exato, faz a comparação direta de igualdade numérica.
            const bateAno = anoFiltro 
                ? Number(livro.anoPublicacao) === Number(anoFiltro) 
                : true;
            
            // O livro só será exibido se passar com sucesso em todas as 3 validações de filtro
            return bateAutor && bateCategoria && bateAno;
        });

        // Atualiza a interface exibindo apenas o resultado filtrado
        renderizarLista(livrosFiltrados, '<p>Nenhum livro encontrado para essa busca.</p>');
    } catch (erro) {
        alert('Erro ao aplicar o filtro nos livros.');
    }
}

// =========================================================================
// 3. LIMPAR FILTROS (Reseta os inputs e recarrega a lista original)
// =========================================================================
function limparFiltros() {
    document.getElementById('filtro-autor').value = '';
    document.getElementById('filtro-categoria').value = '';
    document.getElementById('filtro-ano').value = '';
    carregarLivros(); // Recarrega exibindo todos os livros sem filtros
}

// =========================================================================
// 4. AUXILIAR: RENDERIZAR CARD NO HTML (Cria dinamicamente os elementos visuais)
// =========================================================================
function renderizarLista(lista, mensagemVazia = '<p>Nenhum livro cadastrado.</p>') {
    const container = document.getElementById('lista-livros');
    container.innerHTML = ''; // Limpa a lista atual antes de renderizar a nova

    // Se o array resultante estiver vazio, exibe a mensagem de feedback definida
    if (lista.length === 0) {
        container.innerHTML = mensagemVazia;
        return;
    }

    // Varre cada livro gerando o bloco HTML correspondente
    lista.forEach(livro => {
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
}

// =========================================================================
// 5. EVENTO DE SUBMISSÃO (Envia dados do novo livro para o NestJS via POST)
// =========================================================================
document.getElementById('form-livro').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede que a página recarregue ao enviar o formulário
    
    // Captura os dados inseridos e formata o ano para tipo Number
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
            body: JSON.stringify(dados) // Transforma o objeto JS em string JSON
        });
        
        if (!resposta.ok) {
            const erroData = await resposta.json();
            throw new Error(erroData.message || 'Erro ao criar livro');
        }
        
        document.getElementById('form-livro').reset(); // Limpa os inputs do formulário de cadastro
        carregarLivros(); // Recarrega a lista para exibir o livro recém-criado
    } catch (erro) {
        alert(erro.message);
    }
});

// =========================================================================
// 6. ALTERNAR STATUS DE EMPRÉSTIMO (Inverte o booleano no back-end via PATCH)
// =========================================================================
async function alternarStatus(id, statusAtual) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isEmprestado: !statusAtual }) // Envia o valor booleano invertido
        });
        
        if (!resposta.ok) {
            const erroData = await resposta.json();
            throw new Error(erroData.message || 'Erro ao alternar status');
        }
        
        carregarLivros(); // Recarrega a lista para refletir a mudança visual de status
    } catch (erro) {
        alert(erro.message || 'Não foi possível atualizar o status.');
    }
}

// =========================================================================
// 7. DELETAR UM LIVRO (Remove o registro do servidor via DELETE)
// =========================================================================
async function deletarLivro(id) {
    if (!confirm('Deseja mesmo remover este livro?')) return; // Confirmação de segurança
    try {
        const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        
        if (resposta.status === 204 || resposta.ok) {
            carregarLivros(); // Atualiza a lista na tela removendo o card
        } else {
            const erroData = await resposta.json();
            alert(erroData.message || 'Erro ao deletar');
        }
    } catch (erro) {
        alert('Erro ao conectar com o servidor.');
    }
}

// Inicialização automática: busca e exibe os livros assim que a página terminar de carregar
document.addEventListener('DOMContentLoaded', carregarLivros); 