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


function createEnrolmentsXML(path){    
    var XMLWriter = require('xml-writer');
    var ws = fs.createWriteStream(path + '/enrolments.xml');
    ws.on('close', function() {
        console.log(fs.readFileSync(path + '/enrolments.xml', 'UTF-8'));
    });

    xw = new XMLWriter(false, function(string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')

    xw.startElement("enrolments");

    xw.startElement("enrols");
    
    xw.startElement("enrol");
    xw.writeElement('status', '');
    xw.writeElement('name', '');
    xw.writeElement('enrolperiod', '');
    xw.writeElement('enrolstartdate', '');
    xw.writeElement('enrolenddate', '');
    xw.writeElement('expirynotify', '');
    xw.writeElement('expirythreshold', '');
    xw.writeElement('notifyall', '');
    xw.writeElement('password', '');
    xw.writeElement('cost', '');
    xw.writeElement('currency', '');
    xw.writeElement('roleid', '');
    xw.writeElement('customint1', '');
    xw.writeElement('customint2', '');
    xw.writeElement('customint3', '');
    xw.writeElement('customint4', '');
    xw.writeElement('customint5', '');
    xw.writeElement('customint6', '');
    xw.writeElement('customint7', '');
    xw.writeElement('customint8', '');
    xw.writeElement('customchar1', '');
    xw.writeElement('customchar2', '');
    xw.writeElement('customchar3', '');
    xw.writeElement('customdec1', '');
    xw.writeElement('customdec2', '');
    xw.writeElement('customtext1', '');
    xw.writeElement('customtext2', '');
    xw.writeElement('customtext3', '');
    xw.writeElement('customtext4', '');
    xw.writeElement('timecreated','');
    xw.writeElement('timemodified','');
    xw.writeElement('user_enrolments','');
    xw.endElement();

    xw.endElement();

    xw.endElement();
    
    xw.endDocument();
    
    console.log( xw.flush() );

    ws.end()    
}


function createInforefXML(path){    
    var XMLWriter = require('xml-writer');
    var ws = fs.createWriteStream(path + '/inforef.xml');
    ws.on('close', function() {
        console.log(fs.readFileSync(path + '/inforef.xml', 'UTF-8'));
    });

    xw = new XMLWriter(false, function(string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')
 
    xw.startElement("inforef");
    xw.startElement("grade_itemref", '');
    xw.startElement("grade_item", '');
    xw.writeElement('id','');
    xw.endElement();
    xw.endElement();
    xw.endElement();
    xw.endElement();
    
    xw.endDocument();
    console.log( xw.flush() );
    ws.end()
}

function createSectionXML(path){    
    var XMLWriter = require('xml-writer');
    var ws = fs.createWriteStream(path + '/section.xml');
    ws.on('close', function() {
        console.log(fs.readFileSync(path + '/section.xml', 'UTF-8'));
    });

    xw = new XMLWriter(false, function(string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')
 
    xw.startElement("section");
    xw.writeAttribute('id', '');

    xw.writeElement("number", '');
    xw.writeElement("summary", '');
    xw.writeElement('summaryformat','');
    xw.writeElement('sequence','');
    xw.writeElement('visible','');
    xw.writeElement('availabilityjson','');

    xw.startElement('couse_format_options','');
    xw.writeAttribute('id', '');
    xw.writeElement('format', '');
    xw.writeElement('name','');
    xw.writeElement('value','');
    xw.endElement();

    xw.endElement();

    
    xw.endDocument();
    console.log( xw.flush() );
    ws.end()
}


function createGroupsXML(path){    
    var XMLWriter = require('xml-writer');
    var ws = fs.createWriteStream(path + '/groups.xml');
    ws.on('close', function() {
        console.log(fs.readFileSync(path + '/groups.xml', 'UTF-8'));
    });

    xw = new XMLWriter(false, function(string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')
 
    xw.startElement("groups");
    xw.writeElement("groupings", '');
    xw.endElement();

    xw.endDocument();
    console.log( xw.flush() );
    ws.end()
}

function createOutcomesXML(path){    
    var XMLWriter = require('xml-writer');
    var ws = fs.createWriteStream(path + '/outcomes.xml');
    ws.on('close', function() {
        console.log(fs.readFileSync(path + '/outcomes.xml', 'UTF-8'));
    });

    xw = new XMLWriter(false, function(string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')
 
    xw.writeElement("outcomes_definition", '');

    xw.endDocument();
    console.log( xw.flush() );
    ws.end()
}


function createRolesOuter(path){    
    var XMLWriter = require('xml-writer');
    var ws = fs.createWriteStream(path + '/roles.xml');
    ws.on('close', function() {
        console.log(fs.readFileSync(path + '/roles.xml', 'UTF-8'));
    });

    xw = new XMLWriter(false, function(string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')
 
    xw.startElement("roles_definition", '');
    
    xw.startElement('role','');
    xw.writeAttribute('id', '');
    xw.writeElement('name','');
    xw.writeElement('shortname','');
    xw.writeElement('nameincourse','');
    xw.writeElement('description','');
    xw.writeElement('sortorder','');
    xw.writeElement('archetype','');
    xw.endElement();

    xw.endElement();

    xw.endDocument();
    console.log( xw.flush() );
    ws.end()
}


function createScalesXML(path){    
    var XMLWriter = require('xml-writer');
    var ws = fs.createWriteStream(path + '/scales.xml');
    ws.on('close', function() {
        console.log(fs.readFileSync(path + '/scales.xml', 'UTF-8'));
    });

    xw = new XMLWriter(false, function(string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')
 
    xw.writeElement("scales_definition", '');

    xw.endDocument();
    console.log( xw.flush() );
    ws.end()
}


function createQuestionsXML(path){    
    var XMLWriter = require('xml-writer');
    var ws = fs.createWriteStream(path + '/questions.xml');
    ws.on('close', function() {
        console.log(fs.readFileSync(path + '/questions.xml', 'UTF-8'));
    });

    xw = new XMLWriter(false, function(string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')
 
    xw.writeElement("questions_categories", '');

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
                createEnrolmentsXML(courseDirectory);
                createInforefXML(courseDirectory);
                createRolesXML(courseDirectory);

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

                createInforefXML(section);
                createSectionXML(section);
               
                createGroupsXML(parentDir);
                createOutcomesXML(parentDir);
                createRolesOuter(parentDir);
                createScalesXML(parentDir);
                createQuestionsXML(parentDir);
            });

            

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