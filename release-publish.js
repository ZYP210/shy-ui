
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs= require('fs');
const url = 'packages/ui/package.json'

// 1. 读取JSON文件到内存中
const data = fs.readFileSync(url);
const jsonData = JSON.parse(data);

// 2. 在内存中修改相应的值
jsonData.module='es/index.js';
jsonData.main = 'lib/index.js'

// 3. 将修改后的数据写回到JSON文件中
const newData = JSON.stringify(jsonData, null, 2);
fs.writeFileSync(url, newData);
