// eslint-disable-next-line @typescript-eslint/no-var-requires
const prompts = require('prompts');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SingleBar, Presets } = require('cli-progress');
const progressBar = new SingleBar({}, Presets.shades_classic);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const yaml = require('yamljs');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const url = 'pnpm-workspace.yaml'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')



function copyFolderSync(from, to) {
  // Check if folder needs to be created or integrated
  if (!fs.existsSync(to)) {
      fs.mkdirSync(to, { recursive: true });
  }

  // Copy
  fs.readdirSync(from).forEach(element => {
      if (fs.lstatSync(path.join(from, element)).isFile()) {
          fs.copyFileSync(path.join(from, element), path.join(to, element));
      } else {
          copyFolderSync(path.join(from, element), path.join(to, element));
      }
  });
}




const question = [
  {
    type: 'text',
    message: '请输入文件夹名',
    name: 'fileName'
  },
  {
    type: 'text',
    message: '请输入插件名',
    name: 'pluginName'
  },
]


const askVersion = async () => {
  const res = await prompts(question)
  return res
}


(async () => {
 const cb = await askVersion()

 const source = './template/plugin'
 const target = './packages/'+cb.fileName

 copyFolderSync(source,target)

 // 1. 读取JSON文件到内存中
const data = fs.readFileSync(`${target}/package.json`);
const jsonData = JSON.parse(data);
jsonData.name = cb.pluginName


  // 3. 将修改后的数据写回到JSON文件中
  const newData = JSON.stringify(jsonData, null, 2);
  fs.writeFileSync(`${target}/package.json`, newData);

  exec(`pnpm i -Dw ${cb.pluginName} --filter examples`)

  const vueTemplate = fs.readFileSync('./template/index.vue')

  fs.writeFileSync(`./examples/src/views/${cb.fileName}.vue`,vueTemplate)

})()


