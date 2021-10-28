class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
    }
    attack = () => {
        console.log(`${this.name } Fight...`);
    }
    
    changeHP = (amount) => {    
        this.hp -= amount;
        
        if (this.hp <= 0) {
            this.hp = 0;
        }
    }    

    elHP = () => {
        return document.querySelector(`.player${this.player} .life`);
    }  

    renderHP = () => {
        this.elHP().style.width = `${this.hp}%`;
    }    
}

const player1 = new Player ({
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
});

const player2 = new Player ({
    player: 2,
    name: 'SONYA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
});

export {player1, player2}