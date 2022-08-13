#!/usr/bin/env node
const { Octokit } = require('octokit');
const { Command } = require('commander');
const { execSync } = require('child_process');

const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
});

const program = new Command('rgu');

program
    .description('Rush GitHub utilities')
    .version('0.0.1')
    .argument('<owner>', 'GitHub username or org name')
    .argument('<repo>', 'GitHub repository name')
    .requiredOption('-s, --source <hash>', 'Head hash or branch name')
    .option('--title [title]', 'Title for pull request', 'Update published packages')
    .option('-b, --body [body]' , 'Body message for pull request', 'require merge to update published packages')
    .option('-t, --target <hash>', 'Target hash branch name to merge', 'master')
    .action(async (owner, repo, options) => {
        const {
            title,
            body,
            source: head,
            target: base,
        } = options;
        execSync('git checkout -b ' + head);
        execSync('git push --set-upstream origin ' + head);
        const result = await octokit.request('POST /repos/{owner}/{repo}/pulls', {
            owner,
            repo,
            title,
            body,
            head,
            base,
        });
        await octokit.request('PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge', {
            owner,
            repo,
            pull_number: result.data.number.toString(),
        });
    })
    .parse(process.argv);
