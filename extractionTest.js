let xml2js = require('xml2js');
let fs = require('fs');

fs.readFile('thing1.json', 'utf8', (err, thing1AsString) => {
    console.log(thing1AsString);
    
    let thing1AsObject = JSON.parse(thing1AsString);
    
    let builder = new xml2js.Builder();
    let thing1AsXMLString = builder.buildObject(thing1AsObject);




    fs.writeFile('thing1AsXML.xml', thing1AsXMLString, err => {
        console.log(err);
    });

});

