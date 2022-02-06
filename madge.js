const madge = require('madge');
const {writeJson} = require('./helpers/files/file')
madge('./app.js').then((res) => {
    writeJson("./dep.json", res.obj())
	console.log(res.circularGraph());
});