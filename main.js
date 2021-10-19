const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $loseTitle = createElement('div', 'loseTitle');
const $control = document.querySelector('.control');

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
        return true;        
    }

    if (secondPlayer.hp === 0) {
        $arenas.appendChild(playerWon(firstPlayer.name));
        return true;
    }

    if (firstPlayer.hp === 0 && secondPlayer.hp === 0) {
        $loseTitle.innerText = `It's a draw`;
        return true;
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

function playerTurn(player, damage) {
    player.changeHP(damage);
    player.renderHP();
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'restart__button');

    $reloadButton.innerText = 'Restart';

    $reloadWrap.appendChild($reloadButton);

    $reloadButton.addEventListener ('click', function () {
        location.reload();
    })

    return $reloadWrap;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$randomButton.addEventListener('click', function () {
    playerTurn(player1, randomDamage());
    playerTurn(player2, randomDamage());
    console.log(checkTheWinner(player1, player2));
    checkTheWinner(player1, player2);
    if (checkTheWinner(player1, player2) === true) {        
        $control.appendChild(createReloadButton());
    }
})