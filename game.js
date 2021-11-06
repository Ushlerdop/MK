import {sleep, getRandom} from "./utils.js";

import {generateLogs} from "./logs.js";

import { Player } from "./players.js";

import {createElement, $arenas, $formFight, $fightButton, $loseTitle, $hitDefenceMessagePlayer1, $hitDefenceMessagePlayer2, $reloadButton, $reloadWrap } from "./documentElements.js";

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];
const ANIMATIONS = [    
    {
        id: 1,
        name: "RAIN",
        block: `./assets/fighters/rain/rain-block.png`,
        attack: [
            `./assets/fighters/rain/rain-highkick.png`,
            `./assets/fighters/rain/rain-highpunch.png`,
            `./assets/fighters/rain/rain-hook.png`,
            `./assets/fighters/rain/rain-kick.png`,
            `./assets/fighters/rain/rain-lift.png`,
            `./assets/fighters/rain/rain-punch.png`,
            `./assets/fighters/rain/rain-sidekick.png`,
        ],
        gothit: `./assets/fighters/rain/rain-noblock.png`,
        victory: `./assets/fighters/rain/rain-victory.png`,
        defeat: `./assets/fighters/rain/rain-dizzy.gif`,
    },
    {
        id: 2,
        name: "REPTILE",
        block: `./assets/fighters/reptile/reptile-block.png`,
        attack: [
            `./assets/fighters/reptile/reptile-elbow.png`,
            `./assets/fighters/reptile/reptile-highkick.png`,
            `./assets/fighters/reptile/reptile-highpunch.png`,
            `./assets/fighters/reptile/reptile-hook.png`,
            `./assets/fighters/reptile/reptile-kick.png`,
            `./assets/fighters/reptile/reptile-lowpunch.png`,
            `./assets/fighters/reptile/reptile-sidekick.png`,
            `./assets/fighters/reptile/reptile-sidepunch.png`,
        ],
        gothit: `./assets/fighters/reptile/reptile-noblock.png`,
        victory: `./assets/fighters/reptile/reptile-victory.gif`,
        defeat: `./assets/fighters/reptile/reptile-dizzy.gif`,
    },
    {
        id: 3,
        name: "STRYKER",
        block: `./assets/fighters/stryker/block.png`,
        attack: [
            `./assets/fighters/stryker/highelbow.png`,
            `./assets/fighters/stryker/lowkick.png`,
            `./assets/fighters/stryker/knee.png`,
            `./assets/fighters/stryker/punch.png`,
            `./assets/fighters/stryker/kick.png`,
            `./assets/fighters/stryker/straightkick.png`,
            `./assets/fighters/stryker/uppercot.png`,
            `./assets/fighters/stryker/weapon.png`,
        ],
        gothit: `./assets/fighters/stryker/gothit.png`,
        victory: `./assets/fighters/stryker/victory.png`,
        defeat: `./assets/fighters/stryker/dizzy.gif`,
    },
    {
        id: 4,
        name: "JAX",
        block: `./assets/fighters/jax/block.gif`,
        attack: [
            `./assets/fighters/jax/catch.png`,
            `./assets/fighters/jax/ground.png`,
            `./assets/fighters/jax/highkick.gif`,
            `./assets/fighters/jax/hit.png`,
            `./assets/fighters/jax/kick.png`,
            `./assets/fighters/jax/lowkick.png`,
            `./assets/fighters/jax/uppercot.png`,
            `./assets/fighters/jax/weapon.png`,
        ],
        gothit: `./assets/fighters/jax/gothit.png`,
        victory: `./assets/fighters/jax/victory.png`,
        defeat: `./assets/fighters/jax/dizzy.gif`,
    },
    {
        id: 5,
        name: "NIGHT WOLF",
        block: `./assets/fighters/nightwolf/block.png`,
        attack: [
            `./assets/fighters/nightwolf/closehit.png`,
            `./assets/fighters/nightwolf/highpunch.png`,
            `./assets/fighters/nightwolf/highkick.gif`,
            `./assets/fighters/nightwolf/lowpunch.png`,
            `./assets/fighters/nightwolf/punch.png`,
            `./assets/fighters/nightwolf/straightkick.png`,
        ],
        gothit: `./assets/fighters/nightwolf/gothit.png`,
        victory: `./assets/fighters/nightwolf/victory.png`,
        defeat: `./assets/fighters/nightwolf/dizzy.gif`,
    },
    {
        id: 6,
        name: "JADE",
        block: `./assets/fighters/jade/block.png`,
        attack: [
            `./assets/fighters/jade/lowkick.png`,
            `./assets/fighters/jade/highkick.png`,
            `./assets/fighters/jade/punch.png`,
            `./assets/fighters/jade/sidekick.png`,
            `./assets/fighters/jade/weapon.png`,
        ],
        gothit: `./assets/fighters/jade/gothit.gif`,
        victory: `./assets/fighters/jade/victory.gif`,
        defeat: `./assets/fighters/jade/defeat.png`,
    },
    {
        id: 7,
        name: "NOOB SAIBOT",
        block: `./assets/fighters/noobsaibot/block.png`,
        attack: [
            `./assets/fighters/noobsaibot/lowkick.png`,
            `./assets/fighters/noobsaibot/highkick.png`,
            `./assets/fighters/noobsaibot/highpunch.png`,
            `./assets/fighters/noobsaibot/punch.png`,
            `./assets/fighters/noobsaibot/sidekick.png`,
            `./assets/fighters/noobsaibot/uppercot.png`,
            `./assets/fighters/noobsaibot/weapon.png`,
        ],
        gothit: `./assets/fighters/noobsaibot/gothit.png`,
        victory: `./assets/fighters/noobsaibot/victory.gif`,
        defeat: `./assets/fighters/noobsaibot/dizzy.gif`,
    },
    {
        id: 8,
        name: "SONYA",
        block: `./assets/fighters/sonya/block.png`,
        attack: [
            `./assets/fighters/sonya/lowkick.png`,
            `./assets/fighters/sonya/highkick.png`,
            `./assets/fighters/sonya/highpunch.png`,
            `./assets/fighters/sonya/knee.png`,
            `./assets/fighters/sonya/lowpunch.png`,
            `./assets/fighters/sonya/sidekick.png`,
            `./assets/fighters/sonya/uppercot.png`,
            `./assets/fighters/sonya/weapon.png`,
        ],
        gothit: `./assets/fighters/sonya/gothit.gif`,
        victory: `./assets/fighters/sonya/victory.png`,
        defeat: `./assets/fighters/sonya/dizzy.gif`,
    },
    {
        id: 9,
        name: "KANO",
        block: `./assets/fighters/kano/block.png`,
        attack: [
            `./assets/fighters/kano/closehit.png`,
            `./assets/fighters/kano/flykick.png`,
            `./assets/fighters/kano/highkick.png`,
            `./assets/fighters/kano/highpunch.png`,
            `./assets/fighters/kano/lowpunch.png`,
            `./assets/fighters/kano/punch.png`,
        ],
        gothit: `./assets/fighters/kano/gothit.gif`,
        victory: `./assets/fighters/kano/victory.png`,
        defeat: `./assets/fighters/kano/dizzy.gif`,
    },
    {
        id: 10,
        name: "MILEENA",
        block: `./assets/fighters/mileena/block.png`,
        attack: [
            `./assets/fighters/mileena/sidekick.png`,
            `./assets/fighters/mileena/lowkick.png`,
            `./assets/fighters/mileena/highkick.png`,
            `./assets/fighters/mileena/highpunch.png`,
            `./assets/fighters/mileena/lowpunch.png`,
            `./assets/fighters/mileena/punch.png`,
        ],
        gothit: `./assets/fighters/mileena/gothit.png`,
        victory: `./assets/fighters/mileena/victory.gif`,
        defeat: `./assets/fighters/mileena/defeated.png`,
    },
    {
        id: 12,
        name: "SUB-ZERO",
        block: `./assets/fighters/subzero/block.png`,
        attack: [
            `./assets/fighters/subzero/bear.png`,
            `./assets/fighters/subzero/iceblast.png`,
            `./assets/fighters/subzero/kick.png`,
            `./assets/fighters/subzero/punch.png`,
            `./assets/fighters/subzero/sidekick.png`,
            `./assets/fighters/subzero/uppercot.png`,
        ],
        gothit: `./assets/fighters/subzero/gothit.png`,
        victory: `./assets/fighters/subzero/victory.gif`,
        defeat: `./assets/fighters/subzero/dizzy.gif`,
    },
    {
        id: 13,
        name: "SUB-ZERO",
        block: `./assets/fighters/subzero2/block.png`,
        attack: [
            `./assets/fighters/subzero2/highkick.png`,
            `./assets/fighters/subzero2/highpunch.png`,
            `./assets/fighters/subzero2/sidekick.png`,
            `./assets/fighters/subzero2/uppercot.png`,
            `./assets/fighters/subzero2/weapon.png`,
        ],
        gothit: `./assets/fighters/subzero2/gothit.png`,
        victory: `./assets/fighters/subzero2/victory.png`,
        defeat: `./assets/fighters/subzero2/dizzy.gif`,
    },
    {
        id: 14,
        name: "KUNG LAO",
        block: `./assets/fighters/kunglao/block.gif`,
        attack: [
            `./assets/fighters/kunglao/highkick.gif`,
            `./assets/fighters/kunglao/highpunch.gif`,
            `./assets/fighters/kunglao/lowpunch.gif`,
            `./assets/fighters/kunglao/sidekick.gif`,
            `./assets/fighters/kunglao/uppercot.gif`,
        ],
        gothit: `./assets/fighters/kunglao/gothit.png`,
        victory: `./assets/fighters/kunglao/victory.gif`,
        defeat: `./assets/fighters/kunglao/dizzy.gif`,
    },
    {
        id: 15,
        name: "SEKTOR",
        block: `./assets/fighters/sektor/block.gif`,
        attack: [
            `./assets/fighters/sektor/blowkick.gif`,
            `./assets/fighters/sektor/catch.gif`,
            `./assets/fighters/sektor/highpunch.gif`,
            `./assets/fighters/sektor/lowpunch.gif`,
            `./assets/fighters/sektor/punch.gif`,
            `./assets/fighters/sektor/uppercot.gif`,
            `./assets/fighters/sektor/weapon.gif`,
        ],
        gothit: `./assets/fighters/sektor/gothit.gif`,
        victory: `./assets/fighters/sektor/victory.gif`,
        defeat: `./assets/fighters/sektor/dizzy.gif`,
    },
    {
        id: 16,
        name: "KITANA",
        block: `./assets/fighters/kitana/block.png`,
        attack: [
            `./assets/fighters/kitana/highkick.png`,
            `./assets/fighters/kitana/lowkick.png`,
            `./assets/fighters/kitana/lowpunch.png`,
            `./assets/fighters/kitana/punch.png`,
            `./assets/fighters/kitana/weapon.png`,
            `./assets/fighters/kitana/weapon2.png`,
        ],
        gothit: `./assets/fighters/kitana/gothit.png`,
        victory: `./assets/fighters/kitana/victory.gif`,
        defeat: `./assets/fighters/kitana/defeated.png`,
    },
    {
        id: 17,
        name: "ERMAC",
        block: `./assets/fighters/ermac/block.png`,
        attack: [
            `./assets/fighters/ermac/backkick.png`,
            `./assets/fighters/ermac/backlowkick.gif`,
            `./assets/fighters/ermac/blow.png`,
            `./assets/fighters/ermac/elbow.png`,
            `./assets/fighters/ermac/highkick.png`,
            `./assets/fighters/ermac/highpunch.png`,
            `./assets/fighters/ermac/punch.png`,
            `./assets/fighters/ermac/sidekick.png`,
            `./assets/fighters/ermac/uppercot.gif`,
            `./assets/fighters/ermac/weapon.png`,
        ],
        gothit: `./assets/fighters/ermac/gothit.gif`,
        victory: `./assets/fighters/ermac/victory.png`,
        defeat: `./assets/fighters/ermac/dizzy.gif`,
    },
    {
        id: 18,
        name: "SCORPION",
        block: `./assets/fighters/scorpion/block.png`,
        attack: [
            `./assets/fighters/scorpion/blow.png`,
            `./assets/fighters/scorpion/defeated.png`,
            `./assets/fighters/scorpion/elbow.png`,
            `./assets/fighters/scorpion/highkick.png`,
            `./assets/fighters/scorpion/highpunch.png`,
            `./assets/fighters/scorpion/lowpunch.png`,
            `./assets/fighters/scorpion/sidekick.png`,
            `./assets/fighters/scorpion/uppercot.png`,
            `./assets/fighters/scorpion/weapon.png`,
        ],
        gothit: `./assets/fighters/scorpion/gothit.png`,
        victory: `./assets/fighters/scorpion/victory.gif`,
        defeat: `./assets/fighters/scorpion/dizzy.gif`,
    },
    {
        id: 19,
        name: "CYRAX",
        block: `./assets/fighters/cyrax/block.png`,
        attack: [
            `./assets/fighters/cyrax/highkick.png`,
            `./assets/fighters/cyrax/highpunch.png`,
            `./assets/fighters/cyrax/kick.png`,
            `./assets/fighters/cyrax/lowkick.png`,
            `./assets/fighters/cyrax/punch.png`,
            `./assets/fighters/cyrax/uppercot.png`,
            `./assets/fighters/cyrax/weapon.png`,
        ],
        gothit: `./assets/fighters/cyrax/gothit.png`,
        victory: `./assets/fighters/cyrax/victory.png`,
        defeat: `./assets/fighters/cyrax/dizzy.gif`,
    },
    {
        id: 20,
        name: "KABAL",
        block: `./assets/fighters/kabal/block.png`,
        attack: [
            `./assets/fighters/kabal/highkick.png`,
            `./assets/fighters/kabal/highpunch.png`,
            `./assets/fighters/kabal/lowpunch.png`,
            `./assets/fighters/kabal/scream.png`,
            `./assets/fighters/kabal/sidekick.png`,
            `./assets/fighters/kabal/uppercot.png`,
        ],
        gothit: `./assets/fighters/kabal/gothit.png`,
        victory: `./assets/fighters/kabal/victory.png`,
        defeat: `./assets/fighters/kabal/dizzy.gif`,
    },
    {
        id: 21,
        name: "SINDEL",
        block: `./assets/fighters/sindel/block.png`,
        attack: [
            `./assets/fighters/sindel/highkick.png`,
            `./assets/fighters/sindel/highpunch.png`,
            `./assets/fighters/sindel/lowkick.png`,
            `./assets/fighters/sindel/lowpunch.png`,
            `./assets/fighters/sindel/sidekick.png`,
            `./assets/fighters/sindel/weapon.png`,
        ],
        gothit: `./assets/fighters/sindel/gothit.png`,
        victory: `./assets/fighters/sindel/victory.png`,
        defeat: `./assets/fighters/sindel/dizzy.gif`,
    },
    {
        id: 22,
        name: "SMOKE",
        block: `./assets/fighters/smoke/block.png`,
        attack: [
            `./assets/fighters/smoke/elbow.png`,
            `./assets/fighters/smoke/highkick.png`,
            `./assets/fighters/smoke/kick.png`,
            `./assets/fighters/smoke/punch.png`,
            `./assets/fighters/smoke/sidepunch.png`,
            `./assets/fighters/smoke/uppercot.png`,
        ],
        gothit: `./assets/fighters/smoke/gothit.gif`,
        victory: `./assets/fighters/smoke/victory.png`,
        defeat: `./assets/fighters/smoke/dizzy.gif`,
    },
    {
        id: 23,
        name: "LIU KANG",
        block: `./assets/fighters/liukang/block.png`,
        attack: [
            `./assets/fighters/liukang/highkick.png`,
            `./assets/fighters/liukang/highpunch.png`,
            `./assets/fighters/liukang/kick.png`,
            `./assets/fighters/liukang/lowkick.png`,
            `./assets/fighters/liukang/punch.png`,
            `./assets/fighters/liukang/sidekick.png`,
        ],
        gothit: `./assets/fighters/liukang/gothit.png`,
        victory: `./assets/fighters/liukang/victory.png`,
        defeat: `./assets/fighters/liukang/dizzy.gif`,
    },
    {
        id: 24,
        name: "SHANG TSUNG",
        block: `./assets/fighters/shangtsung/block.png`,
        attack: [
            `./assets/fighters/shangtsung/elbow.png`,
            `./assets/fighters/shangtsung/highkick.png`,
            `./assets/fighters/shangtsung/highpunch.png`,
            `./assets/fighters/shangtsung/kick.png`,
            `./assets/fighters/shangtsung/punch.png`,
            `./assets/fighters/shangtsung/sidekick.png`,
            `./assets/fighters/shangtsung/uppercot.png`,
            `./assets/fighters/shangtsung/weapon.png`,
        ],
        gothit: `./assets/fighters/shangtsung/gothit.png`,
        victory: `./assets/fighters/shangtsung/victory.png`,
        defeat: `./assets/fighters/shangtsung/dizzy.gif`,
    }
]

let player1;
let player2;

class Game{
    start = async () => {
        const enemy = await this.getEnemyPlayer();
        const player = await this.getPlayer();

        let p2 = JSON.parse(localStorage.getItem('player2'));
        let p1 = JSON.parse(localStorage.getItem('player1'));

        player1 = new Player({
            ...p1,
            player: 1,
            animations: ANIMATIONS.find(item => item.id === p1.id),
        });
        player2 = new Player({
            ...p2,
            player: 2,
            animations: ANIMATIONS.find(item => item.id === p2.id),
        });        

        $arenas.appendChild(this.createPlayer(player1));
        $arenas.appendChild(this.createPlayer(player2));

        $formFight.addEventListener('submit', this.fight)

        generateLogs('start', player1, player2);
    }

    fight = async event => {       
        event.preventDefault();

        const enemy = this.enemyAttack();
        const player = this.playerAttack();

        let {hit: enemyHit, defence: enemyDefence, value: enemyValue} = enemy;
        let {hit: playerHit, defence: playerDefence, value: playerValue} = player;

        if (enemyHit !== playerDefence) {
            this.showFormFight();
            this.hideFormFight();   
            await sleep(400);

            this.playerTurn(player2, enemyValue);
            this.showHit(player2);
            generateLogs('hit', player1, player2, enemy);

            this.gotHit(player2);
            await this.attack(player1);
               
            await sleep(400);  
            this.showFormFight();
        } else {
            this.showFormFight();
            this.hideFormFight();   
            await sleep(400);  
            //комп промахивается
            this.showDefence(player2);
            generateLogs('defence', player1, player2);

            this.block(player2);
            await this.attack(player1);
               
            await sleep(400);  
            this.showFormFight();
        }
        if (playerHit !== enemyDefence) {  
            this.showFormFight();     
            this.hideFormFight();   
            await sleep(400);  

            this.playerTurn(player1, playerValue);
            this.showHit(player1);
            generateLogs('hit', player2, player1, player);

            this.gotHit(player1);
            await this.attack(player2);   

            await sleep(400);
            this.showFormFight();
        } else {
            this.showFormFight();
            this.hideFormFight();   
            await sleep(400);  

            this.showDefence(player1);
            generateLogs('defence', player2, player1);
            
            this.block(player1);
            await this.attack(player2);   
   
            await sleep(400);  
            this.showFormFight();
        }

        

        this.checkTheWinner(player1, player2);

        switch (this.checkTheWinner(player1, player2)) {
            case '1':
                generateLogs('end', player1, player2);
                this.victory(player1);
                this.defeat(player2);
                break;
            case '2':
                generateLogs('end', player2, player1);
                this.victory(player2);
                this.defeat(player1);
                break;
            case 'draw':
                generateLogs('draw', player1, player2);
                this.defeat(player1);
                this.defeat(player2);
                break;
        }
    }

    attack = async ({player, animations, img}) => {
        let playerImage = document.querySelector(`.player${player} .character img`);
        playerImage.classList.add('attack');
        playerImage.src = animations.attack[getRandom((animations.attack.length) - 1)];
        await sleep(1000);
        playerImage.classList.remove('attack');
        playerImage.src = img;
    }
    
    block = async ({player, animations, img}) => {
        let playerImage = document.querySelector(`.player${player} .character img`);
        playerImage.src = animations.block;
        await sleep(1000);
        playerImage.src = img;
    }

    gotHit = async ({player, animations, img}) => {
        let playerImage = document.querySelector(`.player${player} .character img`);
        playerImage.src = animations.gothit;
        await sleep(1000);
        playerImage.src = img;
    }
    
    victory = async ({player, animations, img}) => {
        let playerImage = document.querySelector(`.player${player} .character img`);
        playerImage.src = animations.victory;
    }
    
    defeat = async ({player, animations, img}) => {
        let playerImage = document.querySelector(`.player${player} .character img`);
        playerImage.src = animations.defeat;
    }

    enemyAttack = async ({hit, defence} = playerAttack()) => {       

        let attack = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        });

        let result = await attack.json();
    
        return result;
    }

    getPlayer = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then( res => res.json());
        return body;
    }

    getEnemyPlayer = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then( res => res.json());
        return body;
    }

    playerTurn = async (player, damage) => {
        player.changeHP(damage);
        player.renderHP();
    }
    
    hideFormFight = async () => {
        $formFight.classList.add('hide');
    }

    showFormFight = async () => {   
        $formFight.classList.remove('hide');
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
            window.location.pathname = 'index.html';
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
    
}

export default Game