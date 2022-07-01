const mongoose=require('mongoose')

let schema=mongoose.Schema
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const studentSchema=new schema({
   StudentId: {type: Number, default: 0, unique: true},
   firstName:{type:String},
   lastName:{type:String},
      email:{type:String},
     course:{type:String},
     mentor:{type:Number}
})

studentSchema.plugin(autoIncrement.plugin, {
   model: 'studentlist', 
   field: 'StudentId' ,
   startAt: 1,
   incrementBy: 1
});

let studentModel= mongoose.model('studentlist',studentSchema)

module.exports=studentModel