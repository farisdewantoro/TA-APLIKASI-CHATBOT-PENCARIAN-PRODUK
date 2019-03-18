const readline = require('readline');
const { NlpManager,BayesClassifier } = require('node-nlp');
const trainnlp = require('./tesModel');

const threshold = 0.7;
const bayes = new BayesClassifier();

const nlpManager = new NlpManager({
    languages: ['id'],
    classifier: bayes, 
    useNeural: false 
});

function say(message) {
    // eslint-disable-next-line no-console
    console.log(message);
}

(async () => {
    await trainnlp(nlpManager, say);
    say('Say something!');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });
    rl.on('line', async line => {
        if (line.toLowerCase() === 'quit') {
            rl.close();
            process.exit();
        } else {
            const result = await nlpManager.process(`produk yang discount hari ini`);
            console.log(result);
            const answer = result.answer;
            //     result.score > threshold && result.answer
            //         ? 
            //         : "Sorry, I don't understand";
            // let sentiment = '';
            // if (result.sentiment.score !== 0) {
            //     sentiment = `  ${result.sentiment.score > 0 ? ':)' : ':('}   (${
            //         result.sentiment.score
            //         })`;
            // }
            say(`bot> ${answer}`);
        }
    });
})();