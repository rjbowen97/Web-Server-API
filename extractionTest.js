let xml2js = require('xml2js');
let fs = require('fs');

fs.readFile('vpl1128.json', 'utf8', (err, thing1AsString) => {
    console.log(thing1AsString);

    let thing1AsObject = JSON.parse(thing1AsString);

    let xml2jsBuilder = new xml2js.Builder();
    let vpl1128String = xml2jsBuilder.buildObject(thing1AsObject);


    fs.writeFile('vpl1128.xml', vpl1128String, err => {
        console.log(err);
    });
});