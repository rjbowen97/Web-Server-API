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

function writeObjectToFile(object, targetFile) {
    fs.writeFile(targetFile, JSON.stringify(object), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

function writeXMLStringToFile(xmlString, targetFile) {
    fs.writeFile(targetFile, xmlString, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
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

        let mongoClient = require('mongodb').MongoClient;

        // Initialize connection once
        mongoClient.connect("mongodb://localhost:27017", { "useNewUrlParser": true }, function (error, client) {
            if (error) {
                return console.error(error);
            }

            let questionsUsingXml2jsCollection = client.db('autoexam').collection('questionsUsingXml2js');
            let tagsCollection = client.db('autoexam').collection('Tags');

            tagsCollection.find({}).toArray(function (err, fetchedTags) {
                writeObjectToFile(fetchedTags, 'fetchedTags.json');
            });
            console.log('Logging tags available tags...');
            let rawTagsData = fs.readFileSync('fetchedTags.json');  
            var tagsData = JSON.parse(rawTagsData);  
            for(var type in tagsData){
                console.log(type+": "+tagsData[type]);
            }
            console.log('All tags logged.');

            questionsUsingXml2jsCollection.find({}).toArray(function (err, fetchedQuestions) {
                writeObjectToFile(fetchedQuestions, 'fetchedQuestions.json');
                
                console.log('Started desanitizing');
                let desanitizedFetchedQuestions = desanitizeObject(fetchedQuestions)
                writeObjectToFile(desanitizedFetchedQuestions, 'desanitizedFetchedQuestions.json');
                console.log('Finished desanitizing!');

                for (let currentIndex = 0; currentIndex < fetchedQuestions.length; currentIndex++) {
                    let currentQuestionDirectory = "./DesanitizedQuestion" + currentIndex.toString();

                    if (!fs.existsSync(currentQuestionDirectory)) {
                        fs.mkdirSync(currentQuestionDirectory);
                    }

                    let currentDesanitizedQuestion = desanitizedFetchedQuestions[currentIndex];;

                    for (let currentKey of Object.keys(currentDesanitizedQuestion)) {
                        if (currentKey.includes('.xml')) {

                            let currentMBZFileContents = currentDesanitizedQuestion[currentKey];
                            console.log(currentMBZFileContents);

                            let xml2jsBuilder = new xml2js.Builder({"attrkey": "$"});
                            let currentMBZFileContentsAsXML = xml2jsBuilder.buildObject(currentMBZFileContents);

                            writeXMLStringToFile(currentMBZFileContentsAsXML, currentQuestionDirectory + '/' + currentKey);
                        }
                    }
                }
            });
        });
    });
});