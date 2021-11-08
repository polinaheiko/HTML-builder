const fs = require('fs');
const path = require('path');

function getSize(path, say) {
    fs.stat(path, (err, stats) => {
        console.log(say + parseFloat(stats.size) + ' bytes');
    });
    
}

fs.readdir('./03-files-in-folder/secret-folder', 
            { withFileTypes: true }, (err, files) => {
    console.log('\nCurrent directory files: \n');
    if (err) throw err;
    else {
        files.forEach(file => {
            
            if (file.isFile()) {
                var string = file.name.split('.')[0] + ' - ' + path.extname(file.name).split('.')[1] + ' - ';
                getSize(`./03-files-in-folder/secret-folder/${file.name}`, string);
            }
        });
    }
});
