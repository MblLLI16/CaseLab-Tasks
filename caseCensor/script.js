function censor() {
    let pairStorage = [];

    function one(message) {
        let filteredMessage = message;
        for (let i = 0; i < pairStorage.length; i += 2) {
            filteredMessage = filteredMessage.replace(new RegExp(pairStorage[i], 'g'), pairStorage[i + 1]);
        }

        return filteredMessage;
    }

    function two(valueFirst, valueSecond) {
        pairStorage.push(valueFirst, valueSecond);
    }

    return function(...args) {
        if (args.length === 1) {
            return one(args[0]);
        } else if (args.length === 2) {
            two(args[0], args[1]);
        } else {
            throw new Error('The function must take one or two values!');
        }
    };
}

const changeScene = censor();

changeScene('PHP', 'JS');
changeScene('backend', 'frontend');

console.log(changeScene('PHP is the best language for backend development'));
