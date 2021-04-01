const { exec } = require('child_process');

const start = [
    { cwd: "backend", command: "npm start -- -l silly" },
    { cwd: "frontend", command: "npm start" }
];

if (process.env["GITPOD_WORKSPACE_URL"]) {
    process.env["REACT_APP_BACKEND_URL"] = process.env["GITPOD_WORKSPACE_URL"].replace("https://", "https://8080-");
    process.env["FRONTEND_URL"] = process.env["GITPOD_WORKSPACE_URL"].replace("https://", "https://3000-");
} else {
    process.env["REACT_APP_BACKEND_URL"] = "http://localhost:8080";
    process.env["FRONTEND_URL"] = "http://localhost:3000";
}

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