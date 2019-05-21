let xml2js = require('xml2js');
var mongodb = require('mongodb');
let fs = require('fs');
var tunnel = require('tunnel-ssh');
var prompt = require('prompt');

var fsTar = require('fs-extra');
var targz = require('targz');




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


// for generating files we aren't pulling from the database
function generateMiscFiles(targetFile){
    fs.writeFile(targeFile, '', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}


// for generating base files
function createGradeHistoryXML(path){    
    var XMLWriter = require('xml-writer');
    var ws = fs.createWriteStream(path + '/grade_history.xml');
    ws.on('close', function() {
        console.log(fs.readFileSync(path + '/grade_history.xml', 'UTF-8'));
    });

    xw = new XMLWriter(false, function(string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')
 
    xw.startElement("grade_history");
    xw.writeElement("grade_grades", '');
    xw.endElement();
    xw.endElement();
    // xw.writeElement(targetFile,'Hello World');
    // xw.writeAttribute('foo','bar');
    xw.endDocument();
    console.log( xw.flush() );
    ws.end()
}

function createRolesXML(path){    
    var XMLWriter = require('xml-writer');
    var ws = fs.createWriteStream(path + '/roles.xml');
    ws.on('close', function() {
        console.log(fs.readFileSync(path + '/roles.xml', 'UTF-8'));
    });

    xw = new XMLWriter(false, function(string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')

    xw.startElement("roles");
    xw.writeElement("role_overrides",'');
    xw.writeElement("role_assignments",'');
    xw.endElement();


    xw.endDocument();
    
    console.log( xw.flush() );

    ws.end()    
}

function createCourseXML(path){    
    var XMLWriter = require('xml-writer');
    var ws = fs.createWriteStream(path + '/course.xml');
    ws.on('close', function() {
        console.log(fs.readFileSync(path + '/course.xml', 'UTF-8'));
    });

    xw = new XMLWriter(false, function(string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')

    xw.startElement("course");
    xw.writeAttribute('id','');
    xw.writeAttribute('contextid', '');
    
    xw.writeElement("shortname", '');
    xw.writeElement("fullname", '');
    xw.writeElement('idnumber', '');
    xw.writeElement('summary', '');
    xw.writeElement('summaryformat', '');
    xw.writeElement('format', '');
    xw.writeElement('showgrades', '');
    xw.writeElement('newsitems', '');
    xw.writeElement('startdate', '');
    xw.writeElement('enddate', '');
    xw.writeElement('marker', '');
    xw.writeElement('maxybytes', '');
    xw.writeElement('legacyfiles', '');
    xw.writeElement('showreports', '');
    xw.writeElement('visible', '');
    xw.writeElement('groupmode', '');
    xw.writeElement('groupmodeforce', '');
    xw.writeElement('defaultgroupingid', '');
    xw.writeElement('lang', '');
    xw.writeElement('theme', '');
    xw.writeElement('timecreated', '');
    xw.writeElement('timemodified', '');
    xw.writeElement('requested', '');
    xw.writeElement('enablecompletion', '');
    xw.writeElement('completionnotify', '');
    xw.writeElement('idnumber', '');

    xw.startElement('category');
    xw.writeAttribute('id', '');
    xw.writeElement('name', '');
    xw.writeElement('description', '');
    xw.endElement();

    xw.writeElement('tags','');

    xw.endElement();

    xw.endDocument();
    console.log( xw.flush() );
    
    ws.end()  
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

            questionsUsingXml2jsCollection.find({}).toArray(function (err, fetchedQuestions) {
                writeObjectToFile(fetchedQuestions, 'fetchedQuestions.json');
                
                console.log('Started desanitizing');
                let desanitizedFetchedQuestions = desanitizeObject(fetchedQuestions)
                writeObjectToFile(desanitizedFetchedQuestions, 'desanitizedFetchedQuestions.json');
                console.log('Finished desanitizing!');

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

                for (let currentIndex = 0; currentIndex < fetchedQuestions.length; currentIndex++) {
                    let currentQuestionDirectory = activitiesDirectory + "/DesanitizedQuestion" + currentIndex.toString();

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
                            createGradeHistoryXML(activitiesDirectory);
                            createRolesXML(activitiesDirectory);
                        }
                    }
                }


                let courseDirectory = "./MBZ/course"
                if (!fs.existsSync(courseDirectory)) {
                    fs.mkdirSync(courseDirectory);
                }

                createCourseXML(courseDirectory);

                let filesDirectory = "./MBZ/files"
                if (!fs.existsSync(filesDirectory)) {
                    fs.mkdirSync(filesDirectory);
                }

                let sectionsDirectory = "./MBZ/sections"
                if (!fs.existsSync(sectionsDirectory)) {
                    fs.mkdirSync(sectionsDirectory);
                }

                
            });

            // //copy the base files needed for the mbz
            // fsTar.copy('./MBZ', './package_test/base_mbz_2', function (err) {
            //     if (err) {
            //         console.error(err);
            //     } else {
            //         console.log("success!");
            //     }
            // }); //copies directory, even if it has subdirectories or files

            //compress files into tar.gz archive
            targz.compress({
                src: './MBZ',
                dest: './MBZ.mbz'
            }, function(err){
                if(err) {
                    console.log(err);
                } else {
                    console.log("Done!");
                }
            });

        });
    });
});