"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const github = require("@actions/github");
async function run() {
    var token = core.getInput('token', { required: true });
    var octokit = github.getOctokit(token);
    var owner = core.getInput('owner', { required: true });
    var repo = core.getInput('repo', { required: true });
    var tag = core.getInput('tag');
    var release;
    try {
        if (tag == "")
            release = await octokit.rest.repos.getLatestRelease({ owner, repo });
        else
            release = await octokit.rest.repos.getReleaseByTag({ owner, repo, tag });
    }
    catch (e) {
        core.setFailed(`Received ${e.status} during lookup of ${e.response.url}.`);
        return;
    }
    Object.entries(release.data).forEach(entry => {
        if (['number', 'boolean', 'string'].indexOf(typeof entry[1]) >= 0)
            core.setOutput(entry[0], entry[1]);
        else
            core.setOutput(entry[0], JSON.stringify(entry[1]));
    });
    if (/^[vV]\d/.test(release.data.tag_name))
        core.setOutput('version', release.data.tag_name.substr(1));
}
run();
