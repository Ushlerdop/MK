import {$arenas, $fightButton, $loseTitle, playerWon, createReloadButton} from "./documentElements.js";

export function getRandom(max) {
    return Math.floor(Math.random() * (max) + 1);
}

export function checkTheWinner(firstPlayer, secondPlayer) {
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