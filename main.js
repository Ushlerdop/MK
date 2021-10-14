const scorpion = {
    name: 'SCORPION',
    hp: 70,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword'],
    attack: function() {
        console.log(`${this.name } Fight...`);
    },
}

const subZero = {
    name: 'SUB-ZERO',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Daggers'],
    attack: function() {
        console.log(`${this.name } Fight...`);
    },
}

function createPlayer(playerClass, playerObject) {
    //проверка на диапозон здоровья от 0 до 100
    if (playerObject.hp < 0 || playerObject.hp > 100) {
        alert ('HP должно быть от 1 до 100');
        return;
    }

    const $arenas = document.querySelector('.arenas');
    
    const $player = document.createElement('div');
    $player.classList.add(playerClass);

    const $progressBar = document.createElement('div');
    $progressBar.classList.add('progressbar');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = playerObject.hp + '%';

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = playerObject.name;

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);

    
    const $character = document.createElement('div');
    $character.classList.add('character');
    const $img = document.createElement('img');
    $img.src = playerObject.img;
    $character.appendChild($img);

    $player.appendChild($progressBar);
    $player.appendChild($character);
    $arenas.appendChild($player);
}

createPlayer('player1', scorpion);
createPlayer('player2', subZero);