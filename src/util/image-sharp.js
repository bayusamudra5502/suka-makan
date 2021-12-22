const sharp = require('sharp');
const fs = require('fs');

const directory = './src/images/heros';

fs.readdirSync(directory).forEach((file) => {
  sharp(`${directory}/${file}`)
    .resize(768)
    .toFile(`${directory}/${file}-medium.jpg`);
  sharp(`${directory}/${file}`)
    .resize(425)
    .toFile(`${directory}/${file}-small.jpg`);
});
