const { exec } = require('child_process');

const start = [
    { cwd: "backend", command: "npm start -- -l silly" },
    { cwd: "frontend", command: "npm start" }
];

start.forEach(({cwd, command}) => {

    const proc = exec(command, { cwd }, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(stdout);
        console.error(stderr);
    });
    proc.stdout.on('data', function (data) {
        console.log(data.toString());
    });

})