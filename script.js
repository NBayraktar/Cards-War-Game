let deckId
const cardsContainer = document.getElementById('cards')
const deckBtn = document.getElementById('new-deck')
const drawBtn = document.getElementById('draw-cards')
const header = document.getElementById('header-text')

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(response => response.json())
    .then(data => {
      deckId = data.deck_id
    })
  drawBtn.disabled = false
}


function drawNewCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(response => response.json())
    .then(data => {
      const winnerText = determineCardWinner(data.cards[0], data.cards[1])
      header.textContent = winnerText
      cardsContainer.children[0].innerHTML = `
        <img src="${data.cards[0].image}" class="card">
      `
      cardsContainer.children[1].innerHTML = `
        <img src="${data.cards[1].image}" class="card">
      `
    })
}

function determineCardWinner(c1, c2) {
  const cardOptions = ["2", "3", "4", "5", "6", "7", "8", "9",
    "10", "JACK", "QUEEN", "KING", "ACE"
  ]
  const card1ValueIndex = cardOptions.indexOf(c1.value)
  const card2ValueIndex = cardOptions.indexOf(c2.value)
  if (card1ValueIndex > card2ValueIndex) {
    return `Computer Wins!`
  } else if (card1ValueIndex < card2ValueIndex) {
    return `I Win!`
  } else {
    return `War!`
  }
}

deckBtn.addEventListener('click', handleClick)
drawBtn.addEventListener('click', drawNewCards)