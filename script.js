const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
const resetBtn = document.getElementById('reset-btn');

const cardImages = [
    'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg',
    'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg'
];
let cards = [...cardImages, ...cardImages];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = image;
    card.style.backgroundImage = 'url(images/back.jpg)'; // Imagen de la parte trasera
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add('flipped');
    this.style.backgroundImage = `url(images/${this.dataset.image})`;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkMatch();
    }
}

function checkMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;
    if (isMatch) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.style.backgroundImage = 'url(images/back.jpg)';
            secondCard.classList.remove('flipped');
            secondCard.style.backgroundImage = 'url(images/back.jpg)';
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function initGame(shuffleCards = false) {
    if (shuffleCards) {
        cards = shuffle(cards);
    }
    board.innerHTML = ''; // Limpia el tablero
    cards.forEach(image => {
        board.appendChild(createCard(image));
    });
}

// Inicializa el juego al cargar la página
initGame();

// Asocia las funciones de reinicio a los botones
restartBtn.addEventListener('click', () => {
    initGame();
});

resetBtn.addEventListener('click', () => {
    cards = shuffle(cards);
    initGame(true);
});