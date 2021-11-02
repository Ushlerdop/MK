import {getRandom} from "./utils.js";

const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');
const $enemy = document.querySelector('.enemy');
const $root = document.querySelector('.root');

const $plug = createElement('div', 'plug');

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


    let element = [];

    players.forEach(item => {
        const el = createElement('div', ['character', `div${item.id}`]);
        const img = createElement('img');

        /* element = element.concat(el); */

        let mouseMove = () => {
            if (imgSrc === null) {
                imgSrc = item.img;
                const $img = createElement('img');
                $img.src = imgSrc;
                $player.appendChild($img);
            }
        }

        let mouseOut = () => {
            if (imgSrc) {
                imgSrc = null;
                $player.innerHTML = '';
            }
        }

        el.addEventListener('mouseout', mouseOut);
        
        el.addEventListener('mousemove', mouseMove);

        el.addEventListener('click', (e) => {
            e.preventDefault();
            //TODO: Мы кладем нашего игрока в localStorage что бы потом на арене его достать.
            // При помощи localStorage.getItem('player1'); т.к. в localStorage кладется строка,
            // то мы должны ее распарсить обратным методом JSON.parse(localStorage.getItem('player1'));
            // но это уже будет в нашем классе Game когда мы инициализируем игроков.
            localStorage.setItem('player1', JSON.stringify(item));

            el.classList.add('active');

            $root.appendChild($plug);

            el.removeEventListener('mouseout', mouseOut);
            
            /* element.forEach(item => {
                item.removeEventListener('mousemove', mouseMove);
                item.removeEventListener('mouseout', mouseOut);
                console.log(item);
            }); */

            async function initEnemy() {
                imgEnemySrc = null;
                $enemy.innerHTML = '';
                let enemyCharacter = players[getRandom(23)-1];


                //защита от выбора пустого элемента, хоть он и так disabled
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
                // TODO: Здесь должен быть код который перенаправит вас на ваше игровое поле...
                //  Пример использования: window.location.pathname = 'arenas.html';
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
