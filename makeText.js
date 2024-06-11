/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

function generateTextFromFile(filePath){
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
        console.error(`Error reading ${filePath}: ${err}`);
        process.exit(1);
        }
        let mm = new MarkovMachine(data);
        console.log(mm.makeText());
    });
}

async function generateTextFromURL(url){
    try {
        let resp = await axios.get(url);
        let mm = new MarkovMachine(resp.data);
        console.log(mm.makeText());
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let [method, source] = process.argv.slice(2);

if (method === 'file') {
    generateTextFromFile(source);
} else if (method === 'url') {
    generateTextFromURL(source);
}   else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}

