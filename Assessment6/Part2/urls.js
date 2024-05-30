const fs = require("fs");
const axios = require('axios');


function writeToFile(path, data) {
    fs.writeFile(path, data, 'utf8', (err) => {
        if (err) {
            console.log(`Couldn't write to ${path}`);
            process.exit(1);
        }
    });
}

async function writeToUrls(path) {
    fs.readFile(path, 'utf8', async (err, data) => {

        if (err) {
            console.log(`Could not find file ${path}`);
            process.exit(1);
        }

        let urls = data.split(/[ \n]/);
        urls.pop();
        console.log(urls);
        
        
        for (let url of urls) {
            try {
                let res = await axios.get(url);
                writeToFile(`${res.request.host}`, res.data);
                console.log(`Wrote to ${res.request.host}`);
            } catch (error) {
                console.log(`Couldn't download ${url}`);
            }
        }
    })
}


writeToUrls(process.argv[2]);

