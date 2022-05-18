const fs = require("fs");
const { promisify } = require("es6-promisify");

const readFile = fs.readFileSync("./package.json");
console.log(readFile);

// const readFile = promisify(fs.readFile);
// const readJSON = (filePath) => readFile(filePath).then(JSON.parse);

// readJSON("./BlackWidowPoster.jpeg").then((pkg) => console.log(pkg));
