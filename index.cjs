#!/usr/bin/env node

/**
var gradient = require("gradient-string")
var tinycolor = require("tinycolor2")
var fs = require("fs")
let coolGradient = gradient([
    tinycolor('#f0d53b'),
    tinycolor('#ec5c2f')
]);
let coolString = coolGradient('Lim - Mark Framework easier to use.');
fs.writeFileSync('./a.txt', coolString, '');
 */

const inquirer = require('inquirer');
const progress = require('log-progress');
const download = require('download-git-repo');
const log = require('./libs/log.cjs');
const path = require('path');
const fs = require('fs');

const banner = 'Lim - Mark Framework easier to use.';

const gradientBanner = "\x1B[38;2;240;213;59mL\x1B[39m\x1B[38;2;240;209;59mi\x1B[39m\x1B[38;2;240;204;58mm\x1B[39m \x1B[38;2;240;200;58m-\x1B[39m \x1B[38;2;239;196;57mM\x1B[39m\x1B[38;2;239;191;57ma\x1B[39m\x1B[38;2;239;187;56mr\x1B[39m\x1B[38;2;239;183;56mk\x1B[39m \x1B[38;2;239;178;56mF\x1B[39m\x1B[38;2;239;174;55mr\x1B[39m\x1B[38;2;239;170;55ma\x1B[39m\x1B[38;2;238;165;54mm\x1B[39m\x1B[38;2;238;161;54me\x1B[39m\x1B[38;2;238;157;53mw\x1B[39m\x1B[38;2;238;153;53mo\x1B[39m\x1B[38;2;238;148;53mr\x1B[39m\x1B[38;2;238;144;52mk\x1B[39m \x1B[38;2;238;140;52me\x1B[39m\x1B[38;2;237;135;51ma\x1B[39m\x1B[38;2;237;131;51ms\x1B[39m\x1B[38;2;237;127;50mi\x1B[39m\x1B[38;2;237;122;50me\x1B[39m\x1B[38;2;237;118;50mr\x1B[39m \x1B[38;2;237;114;49mt\x1B[39m\x1B[38;2;237;109;49mo\x1B[39m \x1B[38;2;236;105;48mu\x1B[39m\x1B[38;2;236;101;48ms\x1B[39m\x1B[38;2;236;96;47me\x1B[39m\x1B[38;2;236;92;47m.\x1B[39m";

log.n();
console.log(process.stdout.isTTY && process.stdout.getColorDepth() > 8 ? gradientBanner : banner);
log.n();

const date = new Date();

function main () {
    const options = [
        {
            type: 'input',
            name: 'name',
            default: 'lim-demo',
            message: 'Input project name'
        },
        {
            type: 'input',
            name: 'description',
            default: 'Lim project',
            message: 'Input description'
        },
        {
            type: 'input',
            name: 'author',
            default: 'author',
            message: 'Input author name'
        },
        {
            type: 'list',
            name: 'framework',
            message: 'Choice Framework',
            choices: [{
                name: 'vue-lim',
                value: 'github:lim-f/vue-lim-template'
            }, {
                name: 'react-lim',
                value: 'github:lim-f/react-lim-template'
            }]
        }
    ];
    inquirer.prompt(options).then(answers => {
        const url = answers.framework;
        downloadProject(answers, url);
    });
}

function start () {
    progress.start({
        title: `Downloading lim template.`,
        ontick: function (value, percent) {
            if (percent > 90) {
                this.pause(value);
            }
        },
        time: 100,
        total: 199
    });
}

function downloadProject (answers, url) {
    log.n();
    start();
    download(url, answers.name, err => {
        if (progress.isPause()) {
            progress.start();
        }

        if (err) {
            progress.fail('Failed');
            log.n();
            log.red('Project creation failed');
            console.log(err);
        } else {
            progress.complete('Succeed');

            modifyPkg(answers);

            log.n();
            log.green(`Project <${answers.name}> created successfully in ` + (new Date() - date) + ' ms.');
            log.n();
            log.blue('Run the following command to start:');
            log.n();
            log.green(`cd ${answers.name}`);
            log.green('pnpm i');
            log.green('pnpm run dev');
        }
        log.n();
    });
}

function modifyPkg(answers){
    const pkgPath = path.resolve(process.cwd(), `./${answers.name}/package.json`);
    const pkg = require(pkgPath);
    delete answers.framework;
    Object.assign(pkg, answers);
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
}

main();
 


