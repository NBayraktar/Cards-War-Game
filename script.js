let deckId
const cardsContainer = document.getElementById('cards')
const deckBtn = document.getElementById('new-deck')
const drawBtn = document.getElementById('draw-cards')

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
      cardsContainer.children[0].innerHTML = `
        <img src="${data.cards[0].image}" class="card">
      `
      cardsContainer.children[1].innerHTML = `
        <img src="${data.cards[1].image}" class="card">
      `
    })
}

deckBtn.addEventListener('click', handleClick)
drawBtn.addEventListener('click', drawNewCards)