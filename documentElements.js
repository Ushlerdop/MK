const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.control .button');
const $loseTitle = createElement('div', 'loseTitle');
const $formFight = document.querySelector('.control');
const $reloadWrap = createElement('div', 'reloadWrap');
const $reloadButton = createElement('button', 'button');
const $hitDefenceMessagePlayer1 = createElement('div', 'hit-defence__message_p1');
const $hitDefenceMessagePlayer2 = createElement('div', 'hit-defence__message_p2');

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

function showHit(player) {
    let message;
    const $character = document.querySelector(`.player${player.player} .character`);
    switch (player.player) {
        case 1:
            message = $character.appendChild($hitDefenceMessagePlayer1);
            break;
        case 2:
            message = $character.appendChild($hitDefenceMessagePlayer2);
            break;
    }
    
    message.innerText = 'ПРОБИТИЕ';
}

function showDefence(player) {
    let message;
    const $character = document.querySelector(`.player${player.player} .character`);
    switch (player.player) {
        case 1:
            message = $character.appendChild($hitDefenceMessagePlayer1);
            break;
        case 2:
            message = $character.appendChild($hitDefenceMessagePlayer2);
            break;
    }
    message.innerText = 'БЛОК';
}

function createPlayer({ player,name, hp, img }) {
    //проверка на диапозон здоровья от 0 до 100
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
    $life.style.width = `${hp}%`;
    $img.src = img;

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);  

    $character.appendChild($img);

    $player.appendChild($progressBar);
    $player.appendChild($character);

    return $player;
}

function playerWon(name) {
    $loseTitle.innerText = `${name} won!`;

    return $loseTitle;
}

function createReloadButton() {

    $reloadButton.innerText = 'Restart';

    $reloadWrap.appendChild($reloadButton);

    $reloadButton.addEventListener ('click', function () {
        location.reload();
    })

    $arenas.appendChild($reloadWrap);
}

export {$arenas, $fightButton, $loseTitle, $formFight, $hitDefenceMessagePlayer1, $hitDefenceMessagePlayer2, showHit, showDefence, createElement, createPlayer, playerWon, createReloadButton}