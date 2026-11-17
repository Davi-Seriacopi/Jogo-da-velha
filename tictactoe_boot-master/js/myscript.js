// Configurando o monitor de eventos do Javascript
document.addEventListener('DOMContentLoaded', function() {

    // Definição das variáveis que vão receber os atributos HTML
    const celulas = document.querySelectorAll('[data-celula]');
    const status = document.querySelector('.status');
    const resetBtn = document.getElementById('reset-button');

    // Definindo o jogador inicial de forma consistente
    let jogadorAtual = 'Pac';
    let jogoAtivo = true;

    // Criação e inicialização do array do tabuleiro
    let tabuleiro = ['', '', '', '', '', '', '', '', ''];

    // Definição das possibilidades de jogadas
    const possibilidades = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Função que lida com o clique nas células para preencher o array
    function clica(event) {
        const celula = event.target;
        const indice = Array.from(celulas).indexOf(celula);

       // Verifica se a célula já está preenchida ou se o jogo acabou
       if (tabuleiro[indice] !== '' || !jogoAtivo) {
            return;
       }

       // Armazena o jogador no array e adiciona a imagem correspondente
       tabuleiro[indice] = jogadorAtual;
       celula.appendChild(carregaImagem(jogadorAtual));

       // Verifica se houve vitória, empate ou troca o turno
       if (verifica(jogadorAtual)) {
            jogoAtivo = false;
            status.textContent = `O jogador ${jogadorAtual} venceu!`;
       } else if (tabuleiro.includes('')) {
            // Alterna entre 'Pac' e 'Mike'
            jogadorAtual = jogadorAtual === 'Pac' ? 'Mike' : 'Pac';
            status.textContent = `É a vez do jogador ${jogadorAtual}`;
       } else {
            jogoAtivo = false;
            status.textContent = 'Empate!';
       }
    }

    // Função que testa cada jogada percorrendo o Array
    function verifica(jogador) {
        for (const jogadas of possibilidades) {
            if (
                tabuleiro[jogadas[0]] === jogador &&
                tabuleiro[jogadas[1]] === jogador &&
                tabuleiro[jogadas[2]] === jogador
            ) {
                return true;
            }
        }
        return false;
    }

    // Função para carregar a imagem dos personagens em cada célula
    function carregaImagem(jogador) {
        const imagem = new Image();
        imagem.src = jogador === 'Pac' ? 'images/pac.jpg' : 'images/mike.jpg';
        imagem.alt = jogador;
        return imagem;
    }

    // Função para zerar o jogo, reiniciando o Array e limpando o tabuleiro
    function resetJogo() {
        tabuleiro = ['', '', '', '', '', '', '', '', ''];
        jogoAtivo = true;
        jogadorAtual = 'Pac';
        status.textContent = `É a vez do jogador ${jogadorAtual}`;

        // Laço que percorre as células limpando os filhos (imagens)
        celulas.forEach((celula) => {
            celula.textContent = '';
            while (celula.firstChild) {
                celula.removeChild(celula.firstChild);
            }
        });
    }

    // Dispara o evento de clique nas células, chamando a função clica
    celulas.forEach((celula) => {
        celula.addEventListener('click', clica);
    });

    // Dispara o evento de clique no botão de reiniciar
    if (resetBtn) {
        resetBtn.addEventListener('click', resetJogo);
    }
});