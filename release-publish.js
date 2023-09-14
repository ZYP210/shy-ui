// eslint-disable-next-line @typescript-eslint/no-var-requires
const prompts = require('prompts');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SingleBar, Presets } = require('cli-progress');
const progressBar = new SingleBar({}, Presets.shades_classic);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const url = 'packages/ui/package.json'

// 1. 读取JSON文件到内存中
const data = fs.readFileSync(url);
const jsonData = JSON.parse(data);

// 2. 在内存中修改相应的值
jsonData.module = 'es/index.js';
jsonData.main = 'lib/index.js'


// 先截取- 版本取【0】，tag【1】
const [version,tag] = jsonData && jsonData.version &&  jsonData.version.split('-')
const [versionMajor,versionMinor,versionPatch] =version && version.split('.')
const tagList = tag && tag.split('.') || []
const [tagName,tagVersion] = tagList

const getNextVersion = (version , cbTag) => {
  let value = ""

  const major = parseInt(versionMajor)
  const minor = parseInt(versionMinor)
  const patch = parseInt(versionPatch)

  if(version === 'current') {
    value = `${major}.${minor}.${patch}`
  }

  if (version === 'major') {
    value = `${major + 1}.0.0`
  }

  if (version === 'minor') {
    value = `${major}.${minor + 1}.0`
  }

  if (version === 'patch') {
    value = `${major}.${minor}.${patch + 1}`
  }

  if( (cbTag || tagName) && cbTag!=='latest') {
    if(version !== 'current') {
      value = `${value}-${cbTag || tagName}.1`
    }else 
    value = `${value}-${cbTag || tagName}.${tagVersion ? parseInt(tagVersion)+1 : 1}`
  }
  return value
}

const npmPublish = async (res) => {
  progressBar.start(100, 0);
  let index = 0
  const timer = setInterval(()=>{
    if(++index <= 95) {
      progressBar.update(index);
    }else{
      clearInterval(timer)
    }
  },200)


  const {tag , version} = res;
  
  let handleTag = tag
  if(!handleTag){
    const versionList = version && version.match(/-(.*?)\./)
    const tag = versionList && versionList.length>1 && versionList[1]
    handleTag = tag
  }
  const command1 ='cd packages/ui'
  const command2 ='pnpm build'
  const command3 = `pnpm publish --no-git-checks ${handleTag && handleTag!=='latest' ? '--tag ' + handleTag : ''} `;
  
  exec(command1 && command2 && command3 , (error) => {
    if (error) {
      console.error('命令执行出错:', error);
      progressBar.stop();
      return;
    }
    // 这里可以确定命令已经成功完成
    progressBar.update(100); 
  });
}

const question = [
  {
    type: 'select',
    name: 'tag',
    message: '请选择发布标签',
    choices: [
      {
        title: '当前Tag',
        value: ''
      },
      {
        title: 'latest',
        value: 'latest'
      },
      {
        title: 'alpha',
        value: 'alpha'
      },
      {
        title: 'beta',
        value: 'beta'
      },
      { title: '自定义', value: 0 }
    ]
  },
  {
    type: (prev) => prev === 0 ? 'text' : null,
    message: '请输入自定义标签',
    name: 'tag'
  },
  {
    type: 'select',
    name: 'version',
    message: '请选择发布版本',
    choices: (prev) => [
      {
        title: '当前版本',
        value:  getNextVersion('current',prev),
        disabled: [prev,tagName].includes('latest') 
      },
      {
        title: `major(${getNextVersion('major',prev)})`,
        value:  getNextVersion('major',prev)
      },
      {
        title: `major(${getNextVersion('minor',prev)})`,
        value: getNextVersion('minor',prev)

      },
      {
        title: `major(${getNextVersion('patch',prev)})`,
        value: getNextVersion('patch',prev)
      },
      // { title: '自定义', value: 0 }
    ]
  },
  // {
  //   type: (prev) => prev === 0 ? 'text' : null,
  //   message: '请输入自定义版本号',
  //   name: 'customVersion'
  // },
]


const askVersion = async () => {
  const res = await prompts(question)
  if (res.version === 0) {
    jsonData.version = res.customVersion
  } else {
    jsonData.version = res.version
  }
  return res
}


(async () => {
 const cb = await askVersion()
  // 3. 将修改后的数据写回到JSON文件中
  const newData = JSON.stringify(jsonData, null, 2);
  fs.writeFileSync(url, newData);
 await npmPublish(cb)
})()


