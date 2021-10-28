/* import {getRandom} from "./utils.js";

import {$formFight } from "./documentElements.js"; */

/* const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot']; */

/* function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
} */

/* function playerAttack() {
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
} */

/* function playerTurn(player, damage) {
    player.changeHP(damage);
    player.renderHP();
} */

export {/* HIT, ATTACK,  *//* enemyAttack, */ /* playerAttack, */ /* playerTurn */}