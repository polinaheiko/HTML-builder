
const readline = require('readline');
const rl = readline.createInterface({ input, output });
const { open, close, appendFile } = require('fs');


function closeFd(fd) {
  close(fd, (err) => {
    if (err) throw err;
  });
}

open('message.txt', 'a', (err, fd) => {
  if (err) throw err;

  try {
    rl.question('Start your first line:', (answer) => {
        console.log(`Thank you for your line: ${answer}`);
        
        appendFile(fd, answer, 'utf8', (err) => {
            closeFd(fd);
            if (err) throw err;
          });
      });
    
  } catch (err) {
    closeFd(fd);
    throw err;
  }
});