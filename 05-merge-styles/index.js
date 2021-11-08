const fs = require('fs');
const { open, close, appendFile } = require('fs');


function fileRecord(text, fd) {
    appendFile(fd, text, 'utf8', (err) => {
        if (err) throw err;
    });
    closeFd(fd);
}

function closeFd(fd) {
    close(fd, (err) => {
        if (err) throw err;
    });
} 

function deleteFile() {
    fs.unlink('./05-merge-styles/project-dist/bundle.css', (err) => {
        if (err) throw err;
    });
}

fs.readdir('./05-merge-styles/styles', 
            { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    else {
        open('./05-merge-styles/project-dist/bundle.css', 'a', (err, fd) => { 
            if (err) throw err;
            closeFd(fd);
        });
        deleteFile();
        files.forEach(file => {
            if (file.name.split('.')[1] === 'css') {
                reader = fs.createReadStream(`./05-merge-styles/styles/${file.name}`);
                reader.on('data', function (text) {
                    open('./05-merge-styles/project-dist/bundle.css', 'a', (err, fd) => {
                        if (err) throw err;
                        fileRecord(text, fd);
                    });
                });
            } 
        });
    }
});