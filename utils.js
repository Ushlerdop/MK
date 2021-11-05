function getRandom(max) {
    return Math.floor(Math.random() * (max) + 1);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export {sleep, getRandom}