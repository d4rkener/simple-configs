#!/usr/bin/env node

const inquirer = require('inquirer');
const path = require('path');
const { readdirSync, mkdirSync, existsSync } = require('fs');
const { copySync } = require('fs-extra');

const TEMPLATE_DIR = path.join(__dirname + '/templates');
const CHOICES = readdirSync(TEMPLATE_DIR);

const QUESTIONS = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Enter your project name :-',
  },
  {
    type: 'list',
    name: 'template',
    message: 'Select a template :-',
    choices: CHOICES,
  },
];

const createFolder = (name) => {
  if (!existsSync(name)) {
    mkdirSync(name);
  } else {
    console.log('Sorry, the project with this name already exists');
  }
};

const addFilesToUserFolder = (template, name) => {
  const selectedTemplate = TEMPLATE_DIR + `/${template}`;
  const newFolder = path.join(process.cwd() + `/${name}`);

  copySync(selectedTemplate, newFolder);
};

inquirer
  .prompt(QUESTIONS)
  .then((answers) => {
    createFolder(answers.projectName);
    addFilesToUserFolder(answers.template, answers.projectName);
  })
  .catch((err) => console.log(err));
