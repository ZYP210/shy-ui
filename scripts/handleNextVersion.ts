// eslint-disable-next-line @typescript-eslint/no-var-requires
const prompts = require('prompts')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

export const getVersion = async (jsonData: any) => {
  // 先截取- 版本取【0】，tag【1】
  const [version, tag] = (jsonData &&
    jsonData.version &&
    jsonData.version.split('-')) as string[]

  const [versionMajor, versionMinor, versionPatch] =
    version && version.split('.')
  const tagList = (tag && tag.split('.')) || []
  const [tagName, tagVersion] = tagList

  const getNextVersion = (version: string, cbTag: any) => {
    let value = ''

    const major = parseInt(versionMajor)
    const minor = parseInt(versionMinor)
    const patch = parseInt(versionPatch)

    if (version === 'current') {
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

    if ((cbTag || tagName) && cbTag !== 'latest') {
      if (version !== 'current') {
        value = `${value}-${cbTag || tagName}.1`
      } else
        value = `${value}-${cbTag || tagName}.${
          tagVersion ? parseInt(tagVersion) + 1 : 1
        }`
    }
    return value
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
      type: (prev: any) => (prev === 0 ? 'text' : null),
      message: '请输入自定义标签',
      name: 'tag'
    },
    {
      type: 'select',
      name: 'version',
      message: '请选择发布版本',
      choices: (prev: any) => [
        {
          title: '当前版本',
          value: getNextVersion('current', prev),
          disabled: [prev, tagName].includes('latest')
        },
        {
          title: `major(${getNextVersion('major', prev)})`,
          value: getNextVersion('major', prev)
        },
        {
          title: `major(${getNextVersion('minor', prev)})`,
          value: getNextVersion('minor', prev)
        },
        {
          title: `major(${getNextVersion('patch', prev)})`,
          value: getNextVersion('patch', prev)
        }
      ]
    }
  ]

  const res = await prompts(question)

  const filePath = './scripts/tag.txt'
  fs.writeFile(filePath, res.tag, (err: string) => {
    console.log(err)
  })
  return res.version
}
