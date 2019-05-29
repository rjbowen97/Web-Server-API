var xml2js = require('xml2js');
var mongodb = require('mongodb');
var fs = require('fs');
var tunnel = require('tunnel-ssh');
var prompt = require('prompt');

var fsTar = require('fs-extra');
var targz = require('targz');

var mongoDesanitizer = require('./mongoDesanitizer');
var mbzBuilderXMLUtilities = require('./mbzBuilderXMLUtilities');


function writeXMLStringToFile(xmlString, targetFile) {
    fs.writeFile(targetFile, xmlString, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

var buildMBZ = function (mongoQuery) {
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
            mongoClient.connect("mongodb://localhost:27017", { "useNewUrlParser": true }, function (error, client) {
                if (error) {
                    return console.error(error);
                }

                let questionsUsingXml2jsCollection = client.db('autoexam').collection('questionsUsingXml2js');

                questionsUsingXml2jsCollection.find(mongoQuery).toArray(function (err, fetchedQuestions) {
                    let desanitizedFetchedQuestions = mongoDesanitizer.desanitizeObject(fetchedQuestions)

                    // creating parent directory
                    let parentDir = "./MBZ"
                    if (!fs.existsSync(parentDir)) {
                        fs.mkdirSync(parentDir);
                    }
                    // creating activities directory that holds all the questions
                    let activitiesDirectory = "./MBZ/activities"
                    if (!fs.existsSync(activitiesDirectory)) {
                        fs.mkdirSync(activitiesDirectory);
                    }

                    console.log('TEST');
                    for (let currentIndex = 0; currentIndex < fetchedQuestions.length; currentIndex++) {
                        let currentQuestionDirectory = activitiesDirectory + "/DesanitizedQuestion" + currentIndex.toString();

                        if (!fs.existsSync(currentQuestionDirectory)) {
                            fs.mkdirSync(currentQuestionDirectory);
                        }

                        let currentDesanitizedQuestion = desanitizedFetchedQuestions[currentIndex];;
                        console.log(currentDesanitizedQuestion);

                        for (let currentKey of Object.keys(currentDesanitizedQuestion)) {
                            console.log(currentKey);
                            if (currentKey.includes('\\dxml')) {


                                let currentMBZFileContents = currentDesanitizedQuestion[currentKey];
                                console.log('currentMBZFileContents')
                                console.log(currentMBZFileContents);

                                let xml2jsBuilder = new xml2js.Builder({ "attrkey": "$" });
                                let currentMBZFileContentsAsXML = xml2jsBuilder.buildObject(currentMBZFileContents);

                                let replacedKey = currentKey.replace('\\dxml','.xml');

                                writeXMLStringToFile(currentMBZFileContentsAsXML, currentQuestionDirectory + '/' + replacedKey);
                                mbzBuilderXMLUtilities.createGradeHistoryXML(activitiesDirectory);
                                mbzBuilderXMLUtilities.createRolesXML(activitiesDirectory);
                            }
                        }
                    }


                    let courseDirectory = "./MBZ/course"
                    if (!fs.existsSync(courseDirectory)) {
                        fs.mkdirSync(courseDirectory);
                    }

                    mbzBuilderXMLUtilities.createCourseXML(courseDirectory);
                    mbzBuilderXMLUtilities.createEnrolmentsXML(courseDirectory);
                    mbzBuilderXMLUtilities.createInforefXML(courseDirectory);
                    mbzBuilderXMLUtilities.createRolesXML(courseDirectory);

                    let filesDirectory = "./MBZ/files"
                    if (!fs.existsSync(filesDirectory)) {
                        fs.mkdirSync(filesDirectory);
                    }

                    let sectionsDirectory = "./MBZ/sections"
                    if (!fs.existsSync(sectionsDirectory)) {
                        fs.mkdirSync(sectionsDirectory);
                    }

                    let section = "./MBZ/sections/section"
                    if (!fs.existsSync(section)) {
                        fs.mkdirSync(section);
                    }

                    mbzBuilderXMLUtilities.createInforefXML(section);
                    mbzBuilderXMLUtilities.createSectionXML(section);

                    mbzBuilderXMLUtilities.createGroupsXML(parentDir);
                    mbzBuilderXMLUtilities.createOutcomesXML(parentDir);
                    mbzBuilderXMLUtilities.createRolesOuterXML(parentDir);
                    mbzBuilderXMLUtilities.createScalesXML(parentDir);
                    mbzBuilderXMLUtilities.createQuestionsXML(parentDir);
                    mbzBuilderXMLUtilities.createMoodleBackupXML(parentDir);
                });



                //compress files into tar.gz archive
                targz.compress({
                    src: './MBZ',
                    dest: './MBZ.mbz'
                }, function (err) {
                    if (err) {
                    } else {
                        console.log("Done!");
                    }
                });

            });
        });
    });
}

module.exports = { buildMBZ }
