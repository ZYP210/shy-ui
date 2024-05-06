// import consola from 'consola'
// import chalk from 'chalk'
import { findWorkspacePackages } from '@pnpm/find-workspace-packages'
import type { Project } from '@pnpm/find-workspace-packages'
import { getVersion } from './handleNextVersion'
import { resolve } from 'path'

const projRoot = resolve(__dirname, '..')

const getWorkspacePackages = () => findWorkspacePackages(projRoot)

const rewritePackage = async (project: Project, version: string) => {
  await project.writeProjectManifest({
    ...project.manifest,
    version,
    module: 'es/index.js',
    main: 'lib/index.js'
  })
}

async function main() {
  const pkgs = Object.fromEntries(
    (await getWorkspacePackages()).map((pkg) => [pkg.manifest.name, pkg])
  )

  const shyui = pkgs['3h1-ui']

  const version = await getVersion()

  rewritePackage(shyui, version)
}
main()
