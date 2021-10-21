const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.control .button');
const $loseTitle = createElement('div', 'loseTitle');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword'],
    attack,
    changeHP,
    elHP,
    renderHP,
}

const player2 = {
    player: 2,
    name: 'SONYA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Daggers'],
    attack,
    changeHP,
    elHP,
    renderHP,
}

function attack() {
    console.log(`${this.name } Fight...`);
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

function getRandom(max) {
    return Math.floor(Math.random() * (max) + 1);
  }

function checkTheWinner(firstPlayer, secondPlayer) {

    if (firstPlayer.hp === 0 || secondPlayer.hp === 0) {
        $fightButton.disabled = true;        
        createReloadButton();
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

function playerTurn(player, damage) {
    player.changeHP(damage);
    player.renderHP();
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');

    $reloadButton.innerText = 'Restart';

    $reloadWrap.appendChild($reloadButton);

    $reloadButton.addEventListener ('click', function () {
        location.reload();
    })

    $arenas.appendChild($reloadWrap);
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    const enemy = enemyAttack();

    const attack = {};

    for (item of $formFight) {
        if (item.checked === true && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked === true && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }

    console.log('#### МЫ',attack);
    console.log('!!!! ИИ',enemy);
    if (enemy.hit !== attack.defence) {
        playerTurn(player2, enemy.value);
    }
    if (attack.hit !== enemy.defence) {        
        playerTurn(player1, attack.value);
    }
    checkTheWinner(player1, player2);
})