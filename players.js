import {attack} from "./fight.js";
import {changeHP} from "./documentElements.js";
import {elHP} from "./documentElements.js";
import {renderHP} from "./documentElements.js";

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword'],
    attack,
    changeHP,
    elHP,
    renderHP,
}

const player2 = {
    player: 2,
    name: 'SONYA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Daggers'],
    attack,
    changeHP,
    elHP,
    renderHP,
}

export {player1, player2}