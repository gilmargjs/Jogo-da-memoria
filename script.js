//captura todas as divs querySelectorAll
const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let acertos = 0;
let erros = 0;

//função para tocar a classe flip
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch() {

    if (firstCard.dataset.card === secondCard.dataset.card) {
        acertos += 1;
        disableCards();
        document.querySelector('.acertos').innerHTML = acertos;

        return;
    }
    erros += 1;
    unflipCards();
    document.querySelector('.erros').innerHTML = erros

}

//
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//para as cartas voltarem virar
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


//embaralhar as cartas
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;

    })
})();

//loop nas divs einserindo a classe flip
cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});