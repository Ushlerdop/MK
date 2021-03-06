import {getRandom} from "./utils.js";

const date = new Date();
const time = date.toLocaleString('en-GB').slice(12,17);
const $chat = document.querySelector('.chat');

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

function generateLogs(type, player1, player2, playerValue = 0) {
    let text = '';

    let {name: player1Name} = player1;
    let {name: player2Name, hp: player2Hp} = player2;
    let {value: playerDamage} = playerValue;

    switch (type) {
        case 'defence':
            text = `<span class='time'>${time}</span>
            ${logs[type][getRandom(8)-1]
            .replace('[playerKick]', `<span class="playerKick">${player1Name}</span>`)
            .replace('[playerDefence]', `<span class="playerDefence">${player2Name}</span>`)}`;
            break;

        case 'hit':
            text = `<span class='time'>${time}</span>
            ${logs[type][getRandom(18) - 1]
            .replace('[playerKick]', `<span class="playerKick">${player1Name}</span>`)
            .replace('[playerDefence]', `<span class="playerDefence">${player2Name}</span>`)} 
            <span class = 'log-damage'>-${playerDamage}</span>`;
            if (player2Hp >= 66) {
                text = `${text} <span class = 'high-player-hp'>[${player2Hp}/100]</span>`;
            } else if (player2Hp < 66 && player2Hp > 33) {
                text = `${text} <span class = 'medium-player-hp'>[${player2Hp}/100]</span>`;
            } else if (player2Hp <= 33) {
                text = `${text} <span class = 'low-player-hp'>[${player2Hp}/100]</span>`;
            }            
            break;

        case 'start':
            text = `${logs[type]
                .replace('[time]', `<span class='time'>${time}</span>`)
                .replace('[player1]', player1Name)
                .replace('[player2]', player2Name)}`;
            break;

        case 'end':
            text = `${logs[type][getRandom(3) - 1]
                .replace('[playerWins]', `✊${player1Name}`)
                .replace('[playerLose]', `💀${player2Name}`)}`;
            text = `<span class = 'log-end'>${text}</span>`
            break;

        case 'draw':
            text = logs[type];
            break;
    }

    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

export {date, $chat, logs, generateLogs}