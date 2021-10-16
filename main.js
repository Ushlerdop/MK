const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $loseTitle = createElement('div', 'loseTitle');
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

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= randomDamage();

    if (player.hp <= 0) {
        player.hp = 0;
        if (player.player === 1){
            $arenas.appendChild(playerWon(player2.name));
            $randomButton.disabled = true;
        } else {
            $arenas.appendChild(playerWon(player1.name));
            $randomButton.disabled = true;
        }
        

        if (player1.hp === 0 && player2.hp === 0) {
            $loseTitle.innerText = `It's a draw`;
        }

    }

    $playerLife.style.width = player.hp + '%';
    
}

function playerWon(name) {
    $loseTitle.innerText = `${name} won!`;

    return $loseTitle;
}

$randomButton.addEventListener('click', function () {
    changeHP(player1);
    changeHP(player2);
})

/* добавил кнопку перезагрузки */
$restartButton.addEventListener ('click', function () {
    location.reload();
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));