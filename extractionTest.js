let xml2js = require('xml2js');
var mongodb = require('mongodb');
let fs = require('fs');
var tunnel = require('tunnel-ssh');
var prompt = require('prompt');

function desanitizeKey(key) {
    return key.replace(/\\D/g, '$').replace(/\\d/g, '.').replace(/\\b/g, '\\');
}

function desanitizeObject(object) {
    if (object instanceof Array) return object;
    if (typeof object !== 'object') return object;

    const ret = {};
    for (const entry of Object.entries(object)) {
        ret[desanitizeKey(entry[0])] = desanitizeObject(entry[1]);
    }
    return ret;
}


let sshCredentialPromptConfiguration = {
    properties: {
        sshUsername: {
            description: 'Enter ssh username (EECIS username)',
            type: 'string',
            required: true,
        },
        sshPassword: {
            description: 'Enter ssh password (EECIS password)',
            type: 'string',
            required: true,
            hidden: true
        }
    }
};

prompt.get(sshCredentialPromptConfiguration, function (err, result) {
    let sshTunnelConfig = {
        username: result.sshUsername,
        host: 'cisc475-7.cis.udel.edu',
        agent: process.env.SSH_AUTH_SOCK,
        port: 22,
        dstPort: 27017,
        password: result.sshPassword
    };

    let server = tunnel(sshTunnelConfig, function (error, server) {
        if (error) {
            console.log("SSH connection error: " + error);
        }

        let MongoClient = require('mongodb').MongoClient;

        // Initialize connection once
        MongoClient.connect("mongodb://localhost:27017", { "useNewUrlParser": true }, function (error, client) {
            if (error) {
                return console.error(error);
            }

            let questionsUsingXml2jsCollection = client.db('autoexam').collection('questionsUsingXml2js');

            questionsUsingXml2jsCollection.find({}).toArray(function (err, sanitizedItems) {
                console.log(sanitizedItems);

                fs.writeFile('sanitizedItems.json', JSON.stringify(sanitizedItems), (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });

                let desanitizedItems = [];

                sanitizedItems.forEach(currentItem => {
                    let desanitizedItem = desanitizeObject(currentItem);
                    desanitizedItems.push(desanitizedItem);
                });

                fs.writeFile('desanitizedItems.json', JSON.stringify(desanitizedItems), (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            });
        });
    });
});