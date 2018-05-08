import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

const catSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number,
  // user_id : { type: String, ref :'User'}
});

const Cat = mongoose.model('Cat', catSchema);

export default Cat;
