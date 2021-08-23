import * as core from '@actions/core'
import * as github from '@actions/github'

async function run() {
    // Fetch token and create client
    var token = core.getInput('token', {required: true})
    var octokit = github.getOctokit(token)

    // Fetch owner and repo
    var owner = core.getInput('owner', {required: true})
    var repo = core.getInput('repo', {required: true})
    var tag = core.getInput('tag')

    // Fetch latest release
    var release

    try {
        if (tag == "")
            release = await octokit.rest.repos.getLatestRelease({owner, repo})
        else
            release = await octokit.rest.repos.getReleaseByTag({owner, repo, tag})
    } catch (e) {
        core.setFailed(`Received ${e.status} during lookup of ${e.response.url}.`)
        return
    }

    // Write values of type number, boolean and string to outoput
    Object.entries(release.data).forEach(entry => {
        if (['number', 'boolean', 'string'].indexOf(typeof entry[1]) >= 0)
            core.setOutput(entry[0], entry[1])
        else
            core.setOutput(entry[0], JSON.stringify(entry[1]))
    })

    // Add version identifier if `tag_name` starts with "v" and a digit
    if (/^[vV]\d/.test(release.data.tag_name))
        core.setOutput('version', release.data.tag_name.substr(1))
}

run()