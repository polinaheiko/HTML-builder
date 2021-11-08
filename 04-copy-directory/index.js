const { RSA_NO_PADDING } = require('constants');
const fs = require('fs');
const { copyFile, constants } = require('fs');


fs.mkdir('./04-copy-directory/files-copy', { recursive: true }, (err) => {
    if (err) throw err;
});


fs.readdir('./04-copy-directory/files', 
            { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    else {
        files.forEach(file => {
            copyFile(`./04-copy-directory/files/${file.name}`, `./04-copy-directory/files-copy/${file.name}`, (err) => {
                if (err) throw err});
        });
    }
});