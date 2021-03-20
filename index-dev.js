const { exec } = require('child_process');

["backend", "frontend"].forEach(cwd => {

    const proc = exec("npm start", { cwd }, (error, stdout, stderr) => {
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