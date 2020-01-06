'use strict'

const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
  entry:'./index.js',
  output:{
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode:'production'
}