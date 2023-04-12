const fs = require("fs");
const axios = require('axios');

async function getURLs(path) {
    
}

async function writeToUrls(path) {
    fs.readFile(path, 'utf8', async (err, data) => {

        if (err) {
            console.log(`Could not find file ${path}`);
        }

        let urls = data.split(/[ \n]/);
        urls.pop();
        console.log(urls);
        
        for (let url of urls) {
            try {
                let res = await axios.get(url);
                console.log(`Wrote to ${res.url}`);
            } catch (error) {
                console.log(`Couldn't download ${url}`);
            }
        }
    })
}


writeToUrls('./urls.txt')
