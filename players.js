class Player {
    constructor(props) {
        this.player = props.player;
        this.animations = props.animations;
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

export {Player}