import {getRandom} from "./utils.js";

const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');
const $enemy = document.querySelector('.enemy');

let canChooseCharacter = true;

function createElement (tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(item => {
                $tag.classList.add(item);
            })
        } else {
            $tag.classList.add(className);
        }

    }

    return $tag;
}

function createEmptyPlayerBlock() {
    const el = createElement('div', ['character', 'div11', 'disabled']);
    const img = createElement('img');
    img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
    el.appendChild(img);
    $parent.appendChild(el);
}

async function init() {
    localStorage.removeItem('player1');
    localStorage.removeItem('player2');

    const players = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
    let imgSrc = null;
    let imgEnemySrc = null;
    createEmptyPlayerBlock();

    players.forEach(item => {
        const el = createElement('div', ['character', `div${item.id}`]);
        const img = createElement('img');

        let mouseMove = () => {
            if (canChooseCharacter && imgSrc === null) {
                imgSrc = item.img;
                const $img = createElement('img');
                $img.src = imgSrc;
                $player.appendChild($img);
            }
        }

        let mouseOut = () => {
            if (canChooseCharacter && imgSrc) {
                imgSrc = null;
                $player.innerHTML = '';
            }
        }

        el.addEventListener('mouseout', mouseOut);
        
        el.addEventListener('mousemove', mouseMove);

        el.addEventListener('click', (e) => {
            e.preventDefault();

            canChooseCharacter = false;
            $parent.style.pointerEvents = 'none';
            //TODO: ???? ???????????? ???????????? ???????????? ?? localStorage ?????? ???? ?????????? ???? ?????????? ?????? ??????????????.
            // ?????? ???????????? localStorage.getItem('player1'); ??.??. ?? localStorage ???????????????? ????????????,
            // ???? ???? ???????????? ???? ???????????????????? ???????????????? ?????????????? JSON.parse(localStorage.getItem('player1'));
            // ???? ?????? ?????? ?????????? ?? ?????????? ???????????? Game ?????????? ???? ???????????????????????????? ??????????????.
            localStorage.setItem('player1', JSON.stringify(item));

            el.classList.add('active');

            async function initEnemy() {
                imgEnemySrc = null;
                $enemy.innerHTML = '';
                let enemyCharacter = players[getRandom(23)-1];


                //???????????? ???? ???????????? ?????????????? ????????????????, ???????? ???? ?? ?????? disabled
                if (enemyCharacter.id == 11) {
                    enemyCharacter.id == 12;
                }

                let enemyEl = document.querySelector(`.div${enemyCharacter.id}`);
                
                if (!!(document.querySelector(`.character-enemy`))) {
                    enemyEl.classList.remove(`character-enemy`);
                }
        
                enemyEl.classList.add(`character-enemy`);
                console.log(enemyCharacter);
                localStorage.setItem('player2', JSON.stringify(enemyCharacter));
                imgEnemySrc = enemyCharacter.img;
                const $img = createElement('img');
                $img.src = imgEnemySrc;
                $enemy.appendChild($img);
            }
            
            setInterval(async () => {
                if (!!(document.querySelector(`.character-enemy`))) {
                    let enemyEl = document.querySelector(`.character-enemy`);
                    enemyEl.classList.remove(`character-enemy`);
                }
                initEnemy();
            }, 1000);

            setTimeout(async() => {
                // TODO: ?????????? ???????????? ???????? ?????? ?????????????? ???????????????????????? ?????? ???? ???????? ?????????????? ????????...
                //  ???????????? ??????????????????????????: window.location.pathname = 'arenas.html';
                window.location.pathname = 'arena.html';
            }, 4500);          
        });

        img.src = item.avatar;
        img.alt = item.name;

        el.appendChild(img);
        $parent.appendChild(el);
    });
}

init();
