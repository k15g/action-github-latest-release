"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const github = require("@actions/github");
async function run() {
    var token = core.getInput('token', { required: true });
    var octokit = github.getOctokit(token);
    var owner = core.getInput('owner', { required: true });
    var repo = core.getInput('repo', { required: true });
    var release;
    try {
        release = await octokit.rest.repos.getLatestRelease({ owner, repo });
    }
    catch (e) {
        core.setFailed(`Received ${e.status} during lookup.`);
        return;
    }
    Object.entries(release.data).forEach(entry => {
        if (['number', 'boolean', 'string'].indexOf(typeof entry[1]) >= 0)
            core.setOutput(entry[0], entry[1]);
    });
}
run();
