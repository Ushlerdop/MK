import {checkTheWinner} from "./utils.js";

import generateLogs from "./logs.js";

import { player1, player2 } from "./players.js";

import { enemyAttack, playerAttack,playerTurn } from "./fight.js";

import { createPlayer, $arenas, $formFight } from "./documentElements.js";

/* ----------------------------------------------------всё остальное в экспорт---------------------------------------------------------------------------- */

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

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