const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $restartButton = document.querySelector('.restart__button');
const $loseTitle = createElement('div', 'loseTitle');

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword'],
    attack: function() {
        console.log(`${this.name } Fight...`);
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
}

const player2 = {
    player: 2,
    name: 'SONYA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Daggers'],
    attack: function() {
        console.log(`${this.name } Fight...`);
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(playerObject) {
    //проверка на диапозон здоровья от 0 до 100
    if (playerObject.hp < 0 || playerObject.hp > 100) {
        alert ('HP должно быть от 1 до 100');
        return;
    }
    
    const $player = createElement('div', 'player' + playerObject.player);
    const $progressBar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life'); 
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $name.innerText = playerObject.name;
    $life.style.width = playerObject.hp + '%';
    $img.src = playerObject.img;

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);  

    $character.appendChild($img);

    $player.appendChild($progressBar);
    $player.appendChild($character);

    return $player;
}

function randomDamage() {
    return Math.floor(Math.random() * (21 - 1) + 1);
  }

function checkTheWinner(firstPlayer, secondPlayer) {

    if (firstPlayer.hp === 0 || secondPlayer.hp === 0) {
        $randomButton.disabled = true;
    }

    if (firstPlayer.hp === 0) {        
        $arenas.appendChild(playerWon(secondPlayer.name));
    }

    if (secondPlayer.hp === 0) {
        $arenas.appendChild(playerWon(firstPlayer.name));
    }

    if (firstPlayer.hp === 0 && secondPlayer.hp === 0) {
        $loseTitle.innerText = `It's a draw`;
    }
}

function playerWon(name) {
    $loseTitle.innerText = `${name} won!`;

    return $loseTitle;
}

function changeHP(amount) {    
    this.hp -= amount;
    
    if (this.hp <= 0) {
        this.hp = 0;
    }    
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

$randomButton.addEventListener('click', function () {
    player1.changeHP(randomDamage());
    player1.renderHP();
    player2.changeHP(randomDamage());
    player2.renderHP();
    checkTheWinner(player1, player2);
})

/* добавил кнопку перезагрузки */
$restartButton.addEventListener ('click', function () {
    location.reload();
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

console.log(player1.renderHP());

//создать функцию объединяющую elHP и renderHP