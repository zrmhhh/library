const exec = require('child_process').exec;

exec('dir', (err, stdout) => {
    console.log(stdout);
})