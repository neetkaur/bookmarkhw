const {Schema, model} = require('mongoose');

const bm = new Schema({
  name: String,
  url: String
},{timeStamps:true})

module.exports = model('Bookmark', bm)
