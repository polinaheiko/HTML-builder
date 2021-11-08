const fs = require("fs");
 
reader = fs.createReadStream('./01-read-file/text.txt');
reader.on('data', function (line) {
    console.log(line.toString());
});


