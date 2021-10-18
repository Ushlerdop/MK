const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $restartButton = document.querySelector('.restart__button');

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword'],
    attack: function() {
        console.log(`${this.name } Fight...`);
    },
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
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = `${name} won!`;

    return $loseTitle;
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= randomDamage();
    
    if (player.hp <= 0) {
        player.hp = 0;
    }

    $playerLife.style.width = player.hp + '%';
    
}

function elHP() {

}

function renderHP() {
    
}

$randomButton.addEventListener('click', function () {
    changeHP(player1);
    changeHP(player2);
    checkTheWinner(player1, player2);
})

/* добавил кнопку перезагрузки */
$restartButton.addEventListener ('click', function () {
    location.reload();
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));