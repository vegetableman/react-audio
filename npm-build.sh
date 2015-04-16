#!/usr/bin/env node
// -*- mode: js -*-
"use strict";

var glob = require('glob');
var path = require('path');
var fs = require('fs');
var reactTools = require('react-tools');

var libPath = path.join(__dirname, './lib');
if (!fs.existsSync(libPath)) {
  fs.mkdirSync(libPath);
}

function processFile(fileName) {
  var contents = fs.readFileSync(fileName, {encoding: 'utf8'});
  contents = reactTools.transform(contents, {harmony: true, stripTypes: true});
  var jsFile = path.join(libPath, path.basename(fileName));
  if (fs.existsSync(jsFile)) {
    fs.unlinkSync(jsFile);
  }
  fs.writeFileSync(
    path.join(libPath, path.basename(fileName)),
    contents
  );
}

glob.sync(path.join(__dirname, '*.js')).forEach(processFile);
