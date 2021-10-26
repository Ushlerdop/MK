export const $arenas = document.querySelector('.arenas');
export const $fightButton = document.querySelector('.control .button');
export const $loseTitle = createElement('div', 'loseTitle');
export const $formFight = document.querySelector('.control');

export function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

export function createPlayer(playerObject) {
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

export function changeHP(amount) {    
    this.hp -= amount;
    
    if (this.hp <= 0) {
        this.hp = 0;
    }    
}

export function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

export function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
}

export function playerWon(name) {
    $loseTitle.innerText = `${name} won!`;

    return $loseTitle;
}

export function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');

    $reloadButton.innerText = 'Restart';

    $reloadWrap.appendChild($reloadButton);

    $reloadButton.addEventListener ('click', function () {
        location.reload();
    })

    $arenas.appendChild($reloadWrap);
}