const botaoTema = document.getElementById('botaoTema');

// quando a página abre, vê se o tema escuro estava salvo
if (localStorage.getItem('tema') === 'escuro') {
  document.body.classList.add('escuro');
  botaoTema.textContent = '☀️';
}

botaoTema.addEventListener('click', function () {
  document.body.classList.toggle('escuro');

  if (document.body.classList.contains('escuro')) {
    localStorage.setItem('tema', 'escuro');
    botaoTema.textContent = '☀️';
  } else {
    localStorage.setItem('tema', 'claro');
    botaoTema.textContent = '🌙';
  }
});


// ===== MENU DO CELULAR =====
const botaoMenu = document.getElementById('botaoMenu');
const menu = document.getElementById('menu');

botaoMenu.addEventListener('click', function () {
  menu.classList.toggle('aberto');
});

// fecha o menu quando clica em algum link
const linksMenu = document.querySelectorAll('.menu a');
linksMenu.forEach(function (link) {
  link.addEventListener('click', function () {
    menu.classList.remove('aberto');
  });
});


// ===== BIBLIOTECA 1: TYPED.JS (texto digitando) =====
new Typed('#texto-digitando', {
  strings: ['Desenvolvedor Back-End', 'Programador Java e C#', 'Estudante do Cotemig'],
  typeSpeed: 70,
  backSpeed: 40,
  backDelay: 1500,
  loop: true
});


// ===== BIBLIOTECA 2: AOS (animação ao rolar) =====
AOS.init({
  duration: 800,
  once: true
});


// ===== MODAL =====
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const modalTexto = document.getElementById('modalTexto');

function abrirModal(titulo, texto) {
  modalTitulo.textContent = titulo;
  modalTexto.textContent = texto;
  modal.classList.add('aberto');
}

function fecharModal() {
  modal.classList.remove('aberto');
}

// fecha se clicar fora da caixa
modal.addEventListener('click', function (evento) {
  if (evento.target === modal) {
    fecharModal();
  }
});

// informações dos projetos (troque pelos seus)
const projetos = [
  {
    titulo: 'Sistema de Biblioteca',
    texto: 'Sistema em Java para cadastrar livros e alunos e controlar os empréstimos. Os dados ficam salvos no MySQL.'
  },
  {
    titulo: 'Controle de Estoque',
    texto: 'Programa em C# para cadastrar produtos e controlar a entrada e saída do estoque.'
  },
  {
    titulo: 'Banco de Dados de Boletim',
    texto: 'Banco de dados no MySQL com alunos, matérias e notas, com consultas para calcular a média de cada aluno.'
  }
];

function abrirProjeto(numero) {
  abrirModal(projetos[numero].titulo, projetos[numero].texto);
}


// ===== FORMULÁRIO - MÁSCARAS =====
const nome = document.getElementById('nome');
const telefone = document.getElementById('telefone');
const email = document.getElementById('email');
const mensagem = document.getElementById('mensagem');
const contador = document.getElementById('contador');

// nome: aceita só letras e espaço
nome.addEventListener('input', function () {
  nome.value = nome.value.replace(/[^a-zA-ZÀ-ú ]/g, '');
});

// telefone: (00) 00000-0000
telefone.addEventListener('input', function () {
  let numero = telefone.value.replace(/\D/g, ''); // tira tudo que não é número

  if (numero.length > 11) {
    numero = numero.slice(0, 11);
  }

  if (numero.length > 6) {
    telefone.value = '(' + numero.slice(0, 2) + ') ' + numero.slice(2, 7) + '-' + numero.slice(7);
  } else if (numero.length > 2) {
    telefone.value = '(' + numero.slice(0, 2) + ') ' + numero.slice(2);
  } else if (numero.length > 0) {
    telefone.value = '(' + numero;
  } else {
    telefone.value = '';
  }
});

// email: sem espaço e tudo minúsculo
email.addEventListener('input', function () {
  email.value = email.value.replace(/ /g, '').toLowerCase();
});

// mensagem: contador de letras
mensagem.addEventListener('input', function () {
  contador.textContent = mensagem.value.length + '/300';
});


// ===== FORMULÁRIO - VALIDAÇÃO =====
const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault(); // não deixa a página recarregar

  let tudoCerto = true;

  // limpa os erros antigos
  document.getElementById('erroNome').textContent = '';
  document.getElementById('erroTelefone').textContent = '';
  document.getElementById('erroEmail').textContent = '';
  document.getElementById('erroMensagem').textContent = '';

  if (nome.value.trim() === '') {
    document.getElementById('erroNome').textContent = 'Opa, faltou o seu nome.';
    tudoCerto = false;
  }

  if (telefone.value.length < 14) {
    document.getElementById('erroTelefone').textContent = 'Confere o telefone, acho que faltou algum número.';
    tudoCerto = false;
  }

  if (!email.value.includes('@') || !email.value.includes('.')) {
    document.getElementById('erroEmail').textContent = 'Esse e-mail parece estar incompleto.';
    tudoCerto = false;
  }

  if (mensagem.value.trim() === '') {
    document.getElementById('erroMensagem').textContent = 'Escreve alguma coisa pra mim!';
    tudoCerto = false;
  }

  if (tudoCerto) {
    abrirModal('Mensagem enviada!', 'Obrigado pelo contato, ' + nome.value + '. Vou te responder assim que puder.');
    formulario.reset();
    contador.textContent = '0/300';
  }
});
