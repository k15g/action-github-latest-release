import * as core from '@actions/core'
import * as github from '@actions/github'

async function run() {
    // Fetch token and create client
    var token = core.getInput('token', {required: true})
    var octokit = github.getOctokit(token)

    // Fetch owner and repo
    var owner = core.getInput('owner', {required: true})
    var repo = core.getInput('repo', {required: true})

    // Fetch latest release
    const release = await octokit.rest.repos.getLatestRelease({owner, repo})

    // Write values of type number, boolean and string to outoput
    Object.entries(release.data).forEach(entry => {
        if (['number', 'boolean', 'string'].indexOf(typeof entry[1]) >= 0)
            core.setOutput(entry[0], entry[1])
    })
}

run()