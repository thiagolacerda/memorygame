const fs = require('fs');
const path = require('path');

const files = ['src/CardState', 'src/AnimationHelper', 'src/Constants', 'src/Card', 'src/GameController', 'src/Board', 'index']

const rootPath = path.resolve(__dirname, '../');
const fiddleJsFilePath = path.resolve(rootPath, 'jsfiddle.js');

const fiddleJs = fs.openSync(fiddleJsFilePath, 'w');
for (const f of files) {
  const fileContent = fs.readFileSync(`${path.resolve(rootPath, f)}.js`, 'utf8');
  const fileName = `${f.replace(/src\//, '')}.js`;
  fs.writeSync(fiddleJs, `// ${fileName}\n${fileContent.replace(/^(export |import .+;$)/gm, '').trim()}\n\n`);
}

fs.closeSync(fiddleJs);
