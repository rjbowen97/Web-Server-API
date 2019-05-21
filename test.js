let fs = require('fs');
// var tunnel = require('tunnel-ssh');
// var prompt = require('prompt');

// var fsTar = require('fs-extra');
// var targz = require('targz');

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

createGradeHistoryXML(activitiesDirectory);
createRolesXML(activitiesDirectory);
createCourseXML(activitiesDirectory)
