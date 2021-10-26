import getRandom from "./utils.js";
import logs from "./logs.js";

const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.control .button');
const $loseTitle = createElement('div', 'loseTitle');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const date = new Date();

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
    let { hp, name, player, img } = playerObject;
    if (hp < 0 || hp > 100) {
        alert ('HP должно быть от 1 до 100');
        return;
    }
    
    const $player = createElement('div', 'player' + player);
    const $progressBar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life'); 
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $name.innerText = name;
    $life.style.width = hp + '%';
    $img.src = img;

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);  

    $character.appendChild($img);

    $player.appendChild($progressBar);
    $player.appendChild($character);

    return $player;
}

function checkTheWinner(firstPlayer, secondPlayer) {
    let winner = '';

    let {hp: firstHp, name: firstName} = firstPlayer;
    let {hp: secondHp, name: secondName} = secondPlayer;

    if (firstHp === 0 || secondHp === 0) {
        $fightButton.disabled = true;        
        createReloadButton();
    }

    if (firstHp === 0) {        
        $arenas.appendChild(playerWon(secondName));
        return winner = '2';
    }

    if (secondHp === 0) {
        $arenas.appendChild(playerWon(firstName));
        return winner = '1';
    }

    if (firstHp === 0 && secondName === 0) {
        $loseTitle.innerText = `It's a draw`;
        return winner = 'draw';
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
    this.elHP().style.width = `${this.hp}%`;
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

function playerAttack() {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked === true && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked === true && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }

    return attack;
}

function generateLogs(type, player1, player2, playerValue = 0) {
    let text = '';

    let {name: player1Name} = player1;
    let {name: player2Name, hp: player2Hp} = player2;
    let {value: playerDamage} = playerValue;

    switch (type) {

        case 'hit':
            text = `${date.toLocaleString().slice(12,20)} 
                ${logs[type][getRandom(18) - 1]
                .replace('[playerKick]', player1Name)
                .replace('[playerDefence]', player2Name)} 
                -${playerDamage} 
                [${player2Hp}/100]`;
            break;

        case 'start':
            text = `${logs[type]
                .replace('[time]', date.toLocaleString().slice(12,20))
                .replace('[player1]', player1Name)
                .replace('[player2]', player2Name)}`;
            break;

        case 'end':
            text = `${logs[type][getRandom(3) - 1]
                .replace('[playerWins]', player1Name)
                .replace('[playerLose]', player2Name)}`;
            break;

        case 'draw':
            text = logs[type];
            break;
    }

    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack();

    let {hit: enemyHit, defence: enemyDefence, value: enemyValue} = enemy;
    let {hit: playerHit, defence: playerDefence, value: playerValue} = player;

    if (enemyHit !== playerDefence) {
        playerTurn(player2, enemyValue);
        generateLogs('hit', player1, player2, enemy);
    }
    if (playerHit !== enemyDefence) {        
        playerTurn(player1, playerValue);
        generateLogs('hit', player2, player1, player);
    }
    checkTheWinner(player1, player2);
    switch (checkTheWinner(player1, player2)) {
        case '1':
            generateLogs('end', player1, player2);
            break;
        case '2':
            generateLogs('end', player2, player1);
            break;
        case 'draw':
            generateLogs('draw', player1, player2);
            break;
    }
})

generateLogs('start', player1, player2);