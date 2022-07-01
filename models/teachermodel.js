const mongoose=require('mongoose')

let schema=mongoose.Schema
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const teacherSchema=new schema({
   TeacherId: {type: Number, default: 0, unique: true},
   firstName:{type:String},
   lastName:{type:String},
      email:{type:String},
     date_of_join:{type:Date},
     salary:{type:Number},
     students:{
      type:Array,
      default:[]
  }  
})

teacherSchema.plugin(autoIncrement.plugin, {
   model: 'teacherlist', 
   field: 'TeacherId' ,
   startAt: 1,
   incrementBy: 1
});
let teacherModel= mongoose.model('teacherlist',teacherSchema)
module.exports=teacherModel