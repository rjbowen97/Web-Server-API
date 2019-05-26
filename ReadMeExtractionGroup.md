### Spring 2019 Moodle Autotest Group (Mongo extraction):
- Monica Mooney <momooney@udel.edu>
- Richard Bowen <rjbowen@udel.edu>
- Brittany Pham <bpham@udel.edu>
- Logan Muir <logmuir@udel.edu>
- Maaz Nasir <maazn@udel.edu>
- Wei Zhang <zwwpaul@udel.edu>

### Functionality
This Express project's purpose is to generate an MBZ file able to be uploaded directly to Moodle, thus allowing for dynamic and automatic test creation. For an explanation on how to use this project, see "Instructions" below.

This repo is owned by Richard James Bowen (https://github.com/rjbowen97/Web-Server-API) and was forked from Greg Silber's repo (https://github.com/gsilber/Web-Server-API).


### Instructions
#### Installation
   1. First, clone the repo into a folder.
   2. Then, in that folder, type `npm install`
      - This will locally install the node.js packages required by the project

#### Usage
1. Upon completion of the Installation steps, run `npm start` anywhere in the project folder.
2. Open a web browser and type in the following url: [http://localhost:3000/mongoExtraction?tag1=es unit: iteration](http://localhost:3000/mongoExtraction?tag1=es%20unit:%20iteration)
   - IMPORTANT: Note that after the `?` in the url, there is `tag1=es unit: iteration`. This is how querying questions by tags is currently implemented.
      - So, this url will extract any Moodle question in Mongo with the "es unit: iteration" tag.
    - To query using two tags, the following url can be used: http://localhost:3000/mongoExtraction?tag1=es%20unit:%20iteration&tag2=es%20cognitive%20level:%20application
        - Note: Any amount of tags can be added to the query.
        - Note: Currently, the tags are searched for as an AND query. Meaning that to be included in the final MBZ file, a question must have all tags specified in the url.
3. Because this app is run locally (whereas the Mongo server is run on an eecis server), some steps have to be taken *before* the MBZ is actually generated.
4. So, after navigating to the desired url in a browser the user will be prompted for their eecis credentials via the CLI. Enter your credentials when asked.
5. Then, upon successfuly credential verification, the MBZ.mbz will be generated and saved in the project folder.