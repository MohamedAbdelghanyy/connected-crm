/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''
let basePath = '/'

if (isGithubActions) {
  repoURL = "https://mohamedabdelghanyy.github.io/connected-crm/";
  const repo = repoURL.replace(/.*?\//, '')

  assetPrefix = `/${repo}/`
  basePath = `/${repo}`
}

module.exports = {
  assetPrefix: assetPrefix,
  basePath: basePath,
  output: 'export',
  images: {
    loader: 'imgix',
    path: 'the "domain" of your Imigix source',
  },
}