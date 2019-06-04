# Practical usage of automating things using Puppeteer

Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.

## Getting Started

- Clone Repository
- Run `$ cd puppeteer-linkedin-resume/` to go inside working directory
- Run `$ npm install` to install all the depedencies
- Run `$ cd src/` to go inside src

Please ensure that you're on **node 7.6.0+

## Available examples

1. Hey puppeteer show me my website

```bash
$ node demo1.js
```

2. Hey puppeteer fill my registration form.

```bash
$ node demo2.js
```

3. Hey puppeteer generate my resume from linkedIn in pdf format

Create a `resume` folder inside `src` manually to locate your created resumes.

```bash
$ node demo3.js
```

Author: [Chirag Goel](http://www.chirag-goel.in) 
