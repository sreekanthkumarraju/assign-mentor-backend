const mongoose=require('mongoose')
 
const Schema =mongoose.Schema

const assignStudents=new Schema({
    mentorId: {
       type: Schema.Types.ObjectId,
       required: true,
        ref: "teacher",
        },
      students:{
          type:Array,
          default:[]
      }  
})

const assign_students_model=mongoose.model('assign_student',assignStudents)

module.exports=assign_students_model