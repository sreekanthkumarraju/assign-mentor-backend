 const studentModel=require('../models/studentmodel')
 const teacherModel=require('../models/teachermodel')
 const assign_students_model=require('../models/assignStudents')

 const storeteachers=async (req,res)=>{
     console.log(req.body)
     const teacher=await teacherModel.findOne({email:req.body.email})
     console.log(teacher)
     if(teacher)
       {
           res.json({
               statusCode:400,
               message:"Teacher already exists"
           })
       }

     else{  

    const teachers=new teacherModel({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        date_of_join:req.body.date_of_join,
        salary:req.body.salary
    })

   const createTeacher=await teachers.save()
   console.log(createTeacher)

    if( createTeacher)
    {
      res.json({
          statusCode:200,
          message:"Teacher created successfully",
          data:teachers
      })

    }
}
     
 }

 const storeStudents=async (req,res)=>{
     console.log(req.body)

     const student=await studentModel.findOne({email:req.body.email})
     if(student)
      {
          res.json({
              statusCode:400,
              message:"Student already exists"
          })
      }
     else
     {
            let students=new studentModel({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                course:req.body.course,
            
            }) 

            let createStudent=await students.save()
            console.log(createStudent)
            if(createStudent)
              {
                  res.json({
                      status:200,
                      message:"student created successfully",
                      data:students
                  })
              }
     }

 }


 const getStudents=async (req,res)=>{
     
     let students=await studentModel.find({})
    console.log(students)
     res.send(students)
 }



 const getTeachers=async (req,res)=>{
     let teachers=await teacherModel.find({})
res.send(teachers)
 }


  const assignStudents= async (req,res)=>{
   
   let mentor=req.body.mentor.value
   let students=req.body.students
    console.log(req.body)

   const student_model=new assign_students_model({
        mentorId:mentor,
        
     students:
          students.map((student)=>{
              
            return(
               student.value
                
            )
              
          })
     
   })    

   const assigned_students=await student_model.save()
   console.log(assigned_students)

  }

 const teacherDetails=async (req,res) =>{

    const teacher=await teacherModel.findById(req.params.id)

    res.send(teacher)
 }

 const updateTeacher=async (req,res)=>{
  let student_ids=req.body


   const teacher=await teacherModel.findOne({_id:req.params.id})
   console.log(teacher)
   const assigned_student={
       students:
         student_ids.map((id)=>{
          return id.value
       }) 
   }
   await teacher.updateOne(assigned_student)

   const updatedteacher=await teacherModel.findOne({_id:req.params.id})
    console.log(updatedteacher)

    res.json({
        statusCode:200,
        message:"students assigned successfully"
    })
 }


 const getStudentsList=async (req,res)=>{


    const teacher=await teacherModel.findOne({TeacherId:req.params.id})
    console.log(teacher)
    

    let students=teacher.students
    console.log('students',students)
    let studentlist=[]
    for(let i in students)
    {
        studentlist[i]=( await studentModel.findOne({StudentId:students[i]}))
    }
    console.log(studentlist)
    res.send({teacher,studentlist})
 }

 const studentDetails=async (req,res)=>{
      
    const students=await studentModel.findOne({StudentId:req.params.id})
    console.log(students)
    res.send(students)
 }
 
 const assignMentor=async (req,res) =>{

    const student=await studentModel.findOne({StudentId:req.params.id})

    console.log(req.body.value)

    const teachers=await teacherModel.find({})

     for(let i=0;i<teachers.length;i++ )
       {
           let students=teachers[i].students
           console.log(students)

           for(let j=0;j<students.length;j++ )
             {
                 
                 if(parseInt(students[j])===parseInt(req.params.id))
                   {
                       let id=teachers[i].TeacherId
                       console.log(id)
                       students.splice(j,1)
                       let teacher=await teacherModel.updateOne({TeacherId:id},{$set:{'students':students}})
                        console.log(teacher)
                      j=students.length
                      i=teachers.length
                    
                   }
             }
       }

        await studentModel.updateOne({StudentId:req.params.id},{$set:{'mentor':req.body.value}})
       
       let updatedstudent=await studentModel.findOne({StudentId:req.params.id})
       console.log( updatedstudent)
      if( updatedstudent)
         {

            let teacher= await teacherModel.findOne({TeacherId:updatedstudent.mentor})
            console.log(teacher)
            let students=teacher.students
            students.push(updatedstudent.StudentId)

            await teacherModel.updateOne({TeacherId:updatedstudent.mentor},{$set:{'students':students}})
         }
        
       res.send(updatedstudent)
       
 }

 module.exports={storeStudents,storeteachers,getStudents,getTeachers,assignStudents,teacherDetails,updateTeacher,getStudentsList,studentDetails,assignMentor}