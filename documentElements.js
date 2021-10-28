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

export {$arenas, $fightButton, $loseTitle, $formFight, $hitDefenceMessagePlayer1, $reloadButton, $reloadWrap, $hitDefenceMessagePlayer2, createElement}