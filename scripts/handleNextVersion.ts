// eslint-disable-next-line @typescript-eslint/no-var-requires
const prompts = require('prompts')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
const { exec } = require('child_process')
import { resolve } from 'path'

const getRemoteVersion = (tag: string) => {
  const packageName = '3h1-ui'

  return new Promise((resolve, reject) => {
    // 执行命令获取包的版本号
    exec(
      `npm show ${packageName}@${tag} version`,
      (error: any, stdout: any, stderr: any) => {
        if (error) {
          reject(`执行命令时发生错误: ${error.message}`)
        }
        if (stderr) {
          reject(`命令执行产生错误输出: ${stderr}`)
        }
        //最新版本号
        resolve(stdout.trim())
      }
    )
  })
}

export const getVersion = async () => {
  const getNextVersion = (version: string, tag: string, type: number) => {
    let value = ''
    switch (type) {
      case 1:
        const parts = version.split('.')
        if (parts.length > 1) {
          const last = parts.pop()!
          if (last && /^\d+$/.test(last)) {
            parts.push((parseInt(last) + 1).toString())
            value = parts.join('.')
          }
          break
        }
    }
    return value
  }

  const getTagQuestion = [
    {
      type: 'select',
      name: 'tag',
      message: '请选择发布标签',
      choices: [
        {
          title: 'latest',
          value: 'latest'
        },
        {
          title: 'next',
          value: 'next'
        },
        {
          title: 'alpha',
          value: 'alpha'
        },
        { title: '自定义', value: 'custom' }
      ]
    },
    {
      type: (prev: any) => (prev === 'custom' ? 'text' : null),
      message: '请输入自定义标签',
      name: 'tag'
    }
  ]

  const getVersionQuestion = (version: string, tag: string) => {
    return [
      {
        type: 'select',
        name: 'version',
        message: '请选择发布版本',
        choices: [
          {
            title: `当前版本自增：${getNextVersion(version, tag, 1)}`,
            value: getNextVersion(version, tag, 1)
          },
          {
            title: '自定义版本',
            value: 'custom'
          }
        ]
      },
      {
        type: (prev: any) => (prev === 'custom' ? 'text' : null),
        message: '请输入自定义版本',
        name: 'version'
      }
    ]
  }

  //选择tag
  const { tag } = await prompts(getTagQuestion)
  //获取当前tag最新的坂本
  let version = ''
  try {
    version = (await getRemoteVersion(tag)) as string
  } catch (e) {
    version = '0.0.0'
  }
  console.log(`当前版本号: ${version}`)

  //更新版本号
  const { version: newVersion } = await prompts(
    getVersionQuestion(version, tag)
  )

  const projRoot = resolve(__dirname, '..')
  const filePath = resolve(projRoot, './scripts/tag.txt')

  fs.writeFile(filePath, tag, (err: string) => {})

  return newVersion
}
