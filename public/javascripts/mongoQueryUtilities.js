let tagsCollection = client.db('autoexam').collection('Tags');

//Store tags in file, print from file to display options for user
tagsCollection.find({}).toArray(function (err, fetchedTags) {
    writeObjectToFile(fetchedTags, 'fetchedTags.json');
});
console.log('Please select the question tags you would like from the following selections: ');
let rawTagsData = fs.readFileSync('fetchedTags.json');
var tagsData = JSON.parse(rawTagsData);
for (currentIndex = 0; currentIndex < tagsData.length; currentIndex++) {
    console.log("ID: " + tagsData[currentIndex].id + ", TYPE: " + tagsData[currentIndex].type +
        ", NAME: " + tagsData[currentIndex].name);
};