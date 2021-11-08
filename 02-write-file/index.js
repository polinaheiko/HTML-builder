
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const { open, close, appendFile } = require('fs');

function closeFd(fd) {
    close(fd, (err) => {
        if (err) throw err;
    });
}     

function fileRecord(rl, fd) {
    rl.question('New line: ', (answer) => {

                if (answer == 'exit') {
                    console.log("The file is successfully closed. Thank you!")
                    closeFd(fd);
                    rl.close();
                }
                
                else {
                    appendFile(fd, `\n ${answer}`, 'utf8', (err) => {
                        if (err) throw err;
                    });
                    fileRecord(rl, fd);
                }
            });
}


console.log("Starting your new txt file!\n(To stop recording write 'exit' or press Ctrl+C)\n")
    open('./02-write-file/message.txt', 'a', (err, fd) => {
        if (err) throw err;
        fileRecord(rl, fd);

        rl.on('SIGINT', function() {
            console.log("\nThe file is successfully closed. Thank you!")
            closeFd(fd);
            rl.close();
        });
    });
