const API_LIVROS = 'https://gerenciador-livros-interface.onrender.com/livros';
const API_USUARIOS = 'https://gerenciador-livros-interface.onrender.com/usuarios';
const API_EMPRESTIMOS = 'https://gerenciador-livros-interface.onrender.com/emprestimos';

// Variável global para armazenar quem pegou qual livro
let emprestimosAtivos = [];

// =========================================================================
// 1. CARREGAR LIVROS E USUÁRIOS AO INICIALIZAR
// =========================================================================
async function inicializar() {
  await carregarUsuarios();
  await carregarLivros();
}

async function carregarUsuarios() {
  try {
    const resposta = await fetch(API_USUARIOS);
    if (!resposta.ok) throw new Error('Falha ao obter os usuários.');

    const usuarios = await resposta.json();
    const select = document.getElementById('select-usuario');
    select.innerHTML = '';

    usuarios.forEach((usuario) => {
      const opcao = document.createElement('option');
      opcao.value = usuario.id;
      opcao.textContent = usuario.nome;
      select.appendChild(opcao);
    });
  } catch (erro) {
    alert('Erro ao carregar usuários: ' + erro.message);
  }
}

// Atualizado para buscar os livros e os registros de empréstimos ativos simultaneamente
async function carregarLivros() {
  try {
    const [respostaLivros, respostaEmprestimos] = await Promise.all([
      fetch(API_LIVROS),
      fetch(API_EMPRESTIMOS)
    ]);

    if (!respostaLivros.ok || !respostaEmprestimos.ok) {
      throw new Error('Não foi possível obter os dados do catálogo ou de empréstimos.');
    }

    const livros = await respostaLivros.json();
    emprestimosAtivos = await respostaEmprestimos.json();
    
    renderizarLista(livros);
  } catch (erro) {
    alert('Erro ao carregar catálogo: ' + erro.message);
  }
}

// =========================================================================
// 2. RENDERIZAR ACERVO PARA O LEITOR (Regras de Exibição Personalizadas)
// =========================================================================
function renderizarLista(
  lista,
  mensagemVazia = '<p>Nenhum livro disponível no momento.</p>',
) {
  const container = document.getElementById('lista-livros');
  container.innerHTML = '';

  if (lista.length === 0) {
    container.innerHTML = mensagemVazia;
    return;
  }

  // Pega o ID do usuário que está selecionado no topo neste exato momento
  const usuarioLogadoId = Number(document.getElementById('select-usuario').value);

  lista.forEach((livro) => {
    const div = document.createElement('div');
    div.className = 'livro-card';

    // Procura se esse livro tem um empréstimo ativo registrado
    const emprestimoDesteLivro = emprestimosAtivos.find((emp) => emp.livroId === livro.id);

    let botaoAcao = '';

    if (!livro.isEmprestado) {
      // Caso 1: O livro está livre
      botaoAcao = `<button class="btn-emprestar" onclick="solicitarEmprestimo(${livro.id})">Pegar Emprestado</button>`;
    } else if (emprestimoDesteLivro && emprestimoDesteLivro.usuarioId === usuarioLogadoId) {
      // Caso 2: O livro está emprestado, e quem pegou foi o leitor ativo
      botaoAcao = `<button class="btn-cancelar" onclick="devolverLivro(${livro.id})">Devolver</button>`;
    } else {
      // Caso 3: O livro está emprestado, mas por outra pessoa
      botaoAcao = `<button class="btn-indisponivel" disabled>Já Emprestado</button>`;
    }

    div.innerHTML = `
            <div class="livro-info">
                <strong>${livro.titulo}</strong> - ${livro.autor} (${livro.categoria})
                <br><small>Ano: ${livro.anoPublicacao}</small>
            </div>
            <div class="livro-acoes">
                ${botaoAcao}
            </div>
        `;
    container.appendChild(div);
  });
}

// =========================================================================
// 3. FAZER REQUISIÇÃO DE EMPRÉSTIMO (POST)
// =========================================================================
async function solicitarEmprestimo(livroId) {
  const selectUsuario = document.getElementById('select-usuario');
  const usuarioId = Number(selectUsuario.value);

  const dadosPayload = {
    usuarioId: usuarioId,
    livroId: livroId,
  };

  try {
    const resposta = await fetch(API_EMPRESTIMOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosPayload),
    });

    if (!resposta.ok) {
      const dadosErro = await resposta.json();
      throw new Error(dadosErro.message || 'Erro ao processar empréstimo.');
    }

    alert('Empréstimo realizado com sucesso!');
    await carregarLivros(); // Recarrega os status e empréstimos
  } catch (erro) {
    alert('Não foi possível realizar empréstimo: ' + erro.message);
  }
}

// =========================================================================
// 4. DEVOLVER LIVRO (POST)
// =========================================================================
async function devolverLivro(livroId) {
  try {
    const resposta = await fetch(`${API_EMPRESTIMOS}/devolver/${livroId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!resposta.ok) {
      const dadosErro = await resposta.json();
      throw new Error(dadosErro.message || 'Erro ao processar devolução.');
    }

    alert('Livro devolvido com sucesso!');
    await carregarLivros(); // Recarrega os status e empréstimos
  } catch (erro) {
    alert('Não foi possível devolver o livro: ' + erro.message);
  }
}

// =========================================================================
// 5. ATUALIZAR INTERFACE AO ALTERAR USUÁRIO ATIVO
// =========================================================================
function mudarUsuarioAtivo() {
  carregarLivros(); // Recarrega a visualização baseando-se no novo leitor selecionado
}

// =========================================================================
// 6. MESMO FILTRO INTELIGENTE DO PAINEL ADMIN (Busca por Iniciais)
// =========================================================================
async function filtrarLivros() {
  const campoTitulo = document.getElementById('filtro-titulo');
  const campoAutor = document.getElementById('filtro-autor');
  const campoCategoria = document.getElementById('filtro-categoria');
  const campoAno = document.getElementById('filtro-ano');

  if (!campoTitulo || !campoAutor || !campoCategoria || !campoAno) return;

  const tituloFiltro = campoTitulo.value.trim().toLowerCase();
  const autorFiltro = campoAutor.value.trim().toLowerCase();
  const categoriaFiltro = campoCategoria.value.trim().toLowerCase();
  const anoFiltro = campoAno.value.trim();

  try {
    const resposta = await fetch(API_LIVROS);
    const todosLivros = await resposta.json();

    const livrosFiltrados = todosLivros.filter((livro) => {
      const bateTitulo = tituloFiltro
        ? livro.titulo.toLowerCase().trim().startsWith(tituloFiltro)
        : true;
      const bateAutor = autorFiltro
        ? livro.autor.toLowerCase().trim().startsWith(autorFiltro)
        : true;
      const bateCategoria = categoriaFiltro
        ? livro.categoria.toLowerCase().trim().startsWith(categoriaFiltro)
        : true;
      const bateAno = anoFiltro
        ? Number(livro.anoPublicacao) === Number(anoFiltro)
        : true;

      return bateTitulo && bateAutor && bateCategoria && bateAno;
    });

    renderizarLista(
      livrosFiltrados,
      '<p>Nenhum livro encontrado para essa busca.</p>',
    );
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

// Escuta o carregamento total da página para inicializar os dados
document.addEventListener('DOMContentLoaded', inicializar);
