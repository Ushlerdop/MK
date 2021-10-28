import {/* checkTheWinner, */ getRandom} from "./utils.js";

import {generateLogs} from "./logs.js";

import { player1, player2 } from "./players.js";

import { /* enemyAttack, */ /* playerAttack, *//* playerTurn,*/ /* ATTACK, HIT */ } from "./fight.js";

import { /* createPlayer, */ createElement, $arenas, $formFight, /* showDefence, */ /* showHit, */ $fightButton, $loseTitle, /* playerWon, */ /* createReloadButton, */ $hitDefenceMessagePlayer1, $hitDefenceMessagePlayer2, $reloadButton, $reloadWrap } from "./documentElements.js";

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

class Game{
    start = () => {
        $arenas.appendChild(this.createPlayer(player1));
        $arenas.appendChild(this.createPlayer(player2));

        $formFight.addEventListener('submit', this.play)

        generateLogs('start', player1, player2);
   
    }

    playerTurn = (player, damage) => {
        player.changeHP(damage);
        player.renderHP();
    }

    playerWon = (name) => {
        $loseTitle.innerText = `${name} won!`;
    
        return $loseTitle;
    }

    showDraw = () => {
        $loseTitle.innerText = `It's a draw`;
    
        return $loseTitle;
    }

    createReloadButton = () => {

        $reloadButton.innerText = 'Restart';
    
        $reloadWrap.appendChild($reloadButton);
    
        $reloadButton.addEventListener ('click', function () {
            location.reload();
        })
    
        $arenas.appendChild($reloadWrap);
    }

    checkTheWinner = (firstPlayer, secondPlayer) => {
        let winner = '';
    
        let {hp: firstHp, name: firstName} = firstPlayer;
        let {hp: secondHp, name: secondName} = secondPlayer;
    
        if (firstHp === 0 || secondHp === 0) {
            $fightButton.disabled = true;        
            this.createReloadButton();
        }
    
        if (firstHp === 0 && secondHp === 0) {
            $arenas.appendChild(this.showDraw());
            return winner = 'draw';
        }
    
        if (firstHp === 0) {        
            $arenas.appendChild(this.playerWon(secondName));
            return winner = '2';
        }
    
        if (secondHp === 0) {
            $arenas.appendChild(this.playerWon(firstName));
            return winner = '1';
        }
    }

    showHit = (player) => {
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

    showDefence = (player) => {
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

    enemyAttack = () => {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];
    
        return {
            value: getRandom(HIT[hit]),
            hit,
            defence,
        }
    }

    playerAttack = () => {
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

    createPlayer = (/*деструктуризация передаваемого объекта*/{ player,name, hp, img }) => {
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

    play = event => {        
        event.preventDefault();
        const enemy = this.enemyAttack();
        const player = this.playerAttack();

        let {hit: enemyHit, defence: enemyDefence, value: enemyValue} = enemy;
        let {hit: playerHit, defence: playerDefence, value: playerValue} = player;

        if (enemyHit !== playerDefence) {
            this.playerTurn(player2, enemyValue);
            this.showHit(player2);
            generateLogs('hit', player1, player2, enemy);
        } else {
            //комп промахивается
            this.showDefence(player2);
            generateLogs('defence', player1, player2);
        }
        if (playerHit !== enemyDefence) {        
            this.playerTurn(player1, playerValue);
            this.showHit(player1);
            generateLogs('hit', player2, player1, player);
        } else {
            this.showDefence(player1);
            generateLogs('defence', player2, player1);
        }

        this.checkTheWinner(player1, player2);

        switch (this.checkTheWinner(player1, player2)) {
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
    }
}

export default Game