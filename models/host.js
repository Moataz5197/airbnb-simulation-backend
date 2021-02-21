const mongoose = require('mongoose');
const ObjectId =require('mongoose').Types.ObjectId
const Schema = mongoose.Schema;

const HostsSchema = new Schema({
  user_id:{
      type: ObjectId,
      required:true
},
listing:{
    type:Object,
    required:true
}
},{versionKey: false});

const Hosts = mongoose.model('hosts', HostsSchema);

module.exports = Hosts;
