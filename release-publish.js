// eslint-disable-next-line @typescript-eslint/no-var-requires
const prompts = require('prompts');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs= require('fs');
const url = 'packages/ui/package.json'

// 1. 读取JSON文件到内存中
const data = fs.readFileSync(url);
const jsonData = JSON.parse(data);

// 2. 在内存中修改相应的值
jsonData.module='es/index.js';
jsonData.main = 'lib/index.js'



 const getNextVersion = (version) => {
  const list = jsonData.version.split('.')
  const major = parseInt(list[0])
  const minor = parseInt(list[1])
  const patch = parseInt(list[2])

  if(version === 'major') {
    return `${major+1}.0.0`
  }

  if(version === 'minor') {
    return `${major}.${minor+1}.0`
  }

  if(version === 'patch') {
    return `${major}.${minor}.${patch+1}`
  }
  
 }

const question = [
  {
    type:'select',
    name:'version',
    message:'请选择发布版本',
    choices:[
      {
        title:`major(${getNextVersion('major')})`,
        value:getNextVersion('major')
      },
      {
        title:`major(${getNextVersion('minor')})`,
        value:getNextVersion('minor')
        
      },
      {
        title:`major(${getNextVersion('patch')})`,
        value:getNextVersion('patch')
      },
      {title:'自定义',value:0}
    ]
  },
  {
    type:(prev) => prev === 0?'text':null,
    message:'请输入自定义版本号',
    name:'customVersion'
  }
]

const askVersion = async() => {
  const res = await prompts(question)
  if(res.version === 0) {
    jsonData.version = res.customVersion
  }else {
    jsonData.version = res.version
  }
  console.log('res',res);

}


(async() => {
  await askVersion()
  // 3. 将修改后的数据写回到JSON文件中
  const newData = JSON.stringify(jsonData, null, 2);
  fs.writeFileSync(url, newData);
})()


