var fs = require('fs');
var XMLWriter = require('xml-writer');

function createFileWriteStream(targetFolderPath, targetFile) {
    let ws = fs.createWriteStream(targetFolderPath + targetFile);
    ws.on('close', function () {
        console.log(fs.readFileSync(targetFolderPath + targetFile, 'UTF-8'));
    });

    return ws;
}

function createGradeHistoryXML(path) {
    let ws = createFileWriteStream(path, '/grade_history.xml');

    xw = new XMLWriter(false, function (string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')

    xw.startElement("grade_history");
    xw.writeElement("grade_grades", '');

    xw.endElement();
    xw.endDocument();
    console.log(xw.flush());
    ws.end()
}

function createRolesXML(path) {
    let ws = createFileWriteStream(path, '/roles.xml');

    xw = new XMLWriter(false, function (string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')

    xw.startElement("roles");
    xw.writeElement("role_overrides", '');
    xw.writeElement("role_assignments", '');
    xw.endElement();


    xw.endDocument();

    console.log(xw.flush());

    ws.end()
}

function createCourseXML(path) {
    let ws = createFileWriteStream(path, '/course.xml');

    xw = new XMLWriter(false, function (string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')

    xw.startElement("course");
    xw.writeAttribute('id', '');
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

    xw.writeElement('tags', '');

    xw.endElement();

    xw.endDocument();
    console.log(xw.flush());

    ws.end()
}


function createEnrolmentsXML(path) {
    let ws = createFileWriteStream(path, '/enrolments.xml');

    xw = new XMLWriter(false, function (string, encoding) {
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
    xw.writeElement('timecreated', '');
    xw.writeElement('timemodified', '');
    xw.writeElement('user_enrolments', '');
    xw.endElement();

    xw.endElement();

    xw.endElement();

    xw.endDocument();

    console.log(xw.flush());

    ws.end()
}


function createInforefXML(path) {
    let ws = createFileWriteStream(path, '/inforef.xml');

    xw = new XMLWriter(false, function (string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')

    xw.startElement("inforef");
    xw.startElement("grade_itemref", '');
    xw.startElement("grade_item", '');
    xw.writeElement('id', '');
    xw.endElement();
    xw.endElement();
    xw.endElement();
    xw.endElement();

    xw.endDocument();
    console.log(xw.flush());
    ws.end()
}

function createSectionXML(path) {
    let ws = createFileWriteStream(path, '/section.xml');

    xw = new XMLWriter(false, function (string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')

    xw.startElement("section");
    xw.writeAttribute('id', '');

    xw.writeElement("number", '');
    xw.writeElement("summary", '');
    xw.writeElement('summaryformat', '');
    xw.writeElement('sequence', '');
    xw.writeElement('visible', '');
    xw.writeElement('availabilityjson', '');

    xw.startElement('couse_format_options', '');
    xw.writeAttribute('id', '');
    xw.writeElement('format', '');
    xw.writeElement('name', '');
    xw.writeElement('value', '');
    xw.endElement();

    xw.endElement();


    xw.endDocument();
    console.log(xw.flush());
    ws.end()
}


function createGroupsXML(path) {
    let ws = createFileWriteStream(path, '/groups.xml');

    xw = new XMLWriter(false, function (string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')

    xw.startElement("groups");
    xw.writeElement("groupings", '');
    xw.endElement();

    xw.endDocument();
    console.log(xw.flush());
    ws.end()
}

function createOutcomesXML(path) {
    let ws = createFileWriteStream(path, '/outcomes.xml');

    xw = new XMLWriter(false, function (string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')

    xw.writeElement("outcomes_definition", '');

    xw.endDocument();
    console.log(xw.flush());
    ws.end()
}


function createRolesOuterXML(path) {
    let ws = createFileWriteStream(path, '/roles.xml');

    xw = new XMLWriter(false, function (string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')

    xw.startElement("roles_definition", '');

    xw.startElement('role', '');
    xw.writeAttribute('id', '');
    xw.writeElement('name', '');
    xw.writeElement('shortname', '');
    xw.writeElement('nameincourse', '');
    xw.writeElement('description', '');
    xw.writeElement('sortorder', '');
    xw.writeElement('archetype', '');
    xw.endElement();

    xw.endElement();

    xw.endDocument();
    console.log(xw.flush());
    ws.end()
}


function createScalesXML(path) {
    let ws = createFileWriteStream(path, '/scales.xml');

    xw = new XMLWriter(false, function (string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')

    xw.writeElement("scales_definition", '');

    xw.endDocument();
    console.log(xw.flush());
    ws.end()
}


function createQuestionsXML(path) {
    let ws = createFileWriteStream(path, '/questions.xml');

    xw = new XMLWriter(false, function (string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')

    xw.writeElement("questions_categories", '');

    xw.endDocument();
    console.log(xw.flush());
    ws.end()
}

function createMoodleBackupXML(path) {
    let ws = createFileWriteStream(path, '/moodle_backup.xml');

    xw = new XMLWriter(false, function (string, encoding) {
        ws.write(string, encoding);
    });
    xw.startDocument('1.0', 'UTF-8')

    xw.startElement("moodle_backup", '');

    xw.startElement("information");
    xw.writeElement("name", '');
    xw.writeElement("moodle_version", '');
    xw.writeElement('moodle_release', '');
    xw.writeElement('backup_version', '');
    xw.writeElement('backup_release', '');
    xw.writeElement('backup_date', '');
    xw.writeElement('mnet_remoteusers', '');
    xw.writeElement('include_files', '');
    xw.writeElement('include_file_references_to_external_content', '');
    xw.writeElement('original_wwwroot', '');
    xw.writeElement('original_site_identifier_hash', '');
    xw.writeElement('original_course_id', '');
    xw.writeElement('original_course_format', '');
    xw.writeElement('original_course_fullname', '');
    xw.writeElement('original_course_shortname', '');
    xw.writeElement('original_course_startdate', '');
    xw.writeElement('original_course_enddate', '');
    xw.writeElement('original_course_contextid', '');
    xw.writeElement('original_system_contextid', '');

    xw.startElement('details', '');

    xw.startElement('detail', '');
    xw.writeAttribute('backup_id', '');
    xw.writeElement('type', '');
    xw.writeElement('format', '');
    xw.writeElement('interactive', '');
    xw.writeElement('mode', '');
    xw.writeElement('execution', '');
    xw.writeElement('executiontime', '');
    xw.endElement(); //detail

    xw.endElement(); //details

    xw.startElement('contents', '');

    xw.startElement('activities', '');

    xw.startElement('activity', '');
    xw.writeElement('moduleid', '');
    xw.writeElement('sectionid', '');
    xw.writeElement('modulename', '');
    xw.writeElement('title', '');
    xw.writeElement('directory', '');
    xw.endElement(); //activity

    xw.endElement(); //activities

    xw.startElement('sections', '');
    xw.startElement('section', '');
    xw.writeElement('sectionid', '');
    xw.writeElement('title', '');
    xw.writeElement('directory', '');
    xw.endElement(); //section
    xw.endElement(); //sections

    xw.startElement('course', '');
    xw.writeElement('courseid', '');
    xw.writeElement('title', '');
    xw.writeElement('directory', '');
    xw.endElement(); //course

    xw.endElement(); //contents

    xw.startElement('settings', '');
    xw.startElement('setting', '');
    xw.writeElement('level', '');
    xw.writeElement('name', '');
    xw.writeElement('value', '');
    xw.endElement(); //setting
    xw.endElement(); //settings

    xw.endElement(); //information
    xw.endElement(); //moodlebackup

    xw.endDocument();
    console.log(xw.flush());
    ws.end()
}

module.exports = {
    createGradeHistoryXML,
    createRolesXML,
    createCourseXML,
    createEnrolmentsXML,
    createInforefXML,
    createSectionXML,
    createGroupsXML,
    createOutcomesXML,
    createRolesOuterXML,
    createScalesXML,
    createQuestionsXML,
    createMoodleBackupXML
}