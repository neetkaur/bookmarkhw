const {Schema, model} = require('mongoose');

const bm = new Schema({
  name: String,
  url: String
},{timestamps:true})

module.exports = model('Bookmark', bm)
