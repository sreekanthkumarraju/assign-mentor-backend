const express=require('express')
const {storeStudents,storeteachers,getStudents,getTeachers,assignStudents,teacherDetails,updateTeacher,getStudentsList,studentDetails,assignMentor}=require('../controller/function')
const router=express.Router()

router.route('/createTeacher').post(storeteachers)

router.route('/createStudent').post(storeStudents)

router.route('/createStudent').get(getStudents)

router.route('/createTeacher').get(getTeachers)

router.route('/assignstudents').post(assignStudents)

router.route('/createTeacher/:id').get(teacherDetails)

router.route('/getStudent/:id').get(studentDetails)

router.route('/teachers/:id').put(updateTeacher)

router.route('/teacher/studentlist/:id').get(getStudentsList)

router.route('/AssignMentor/:id').put(assignMentor)




module.exports=router