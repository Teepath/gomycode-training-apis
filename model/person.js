const mongoose = require('mongoose');
const bcrypt=require ('bcryptjs');


const personSchema = mongoose.Schema({
name:{
    type: String,
    required:true,
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true,
},
},

{
    timestamp:true
}
)


personSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Encrypt password using bcrypt
  personSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });


const Person = mongoose.model('Person', personSchema);

module.exports = Person;