import { Types } from 'mongoose';
import Attendance, { IAttendance } from './../models/attendance.model';
import Student, { IStudent } from './../models/student.model';

export const createAttendanceToday = async(attendance:IAttendance) => {
    const today = new Date();
    const nameAtt = today.getDay() + "/" + today.getMonth() + "/"+today.getFullYear();
    attendance.code = nameAtt;
    const createdAttendance = await Attendance.create(attendance);
    if(attendance.type == 'E'){
        const allStudents = await Student.find({}, { attendanceSpecial: 1});
        const newAttendance = {
            idAtt: createdAttendance.id,
            code: createdAttendance.code
        }
        try {
            for(let stu of allStudents){
                stu.attendanceSpecial.push(newAttendance)
                await stu.save();
            }
            return createdAttendance;
        } catch (e) {
            return {error: "ERROR_ATTENDANCETODAY_STUDENT_ASSING_SPECIAL", reason: e};
        }
    }else{
        const allStudents = await Student.find({}, { attendanceNormal: 1});
        const newAttendance = {
            idAtt: createdAttendance.id,
            code: createdAttendance.code
        }
        try {
            if(allStudents[0].attendanceNormal.length > 0){
                const lastAttendance = allStudents[0].attendanceNormal[allStudents[0].attendanceNormal.length -1]
                if(lastAttendance.code == createdAttendance.code) return {message: "ALREADY_CREADTED_ATTENDANCE"};
            }
            for(let stu of allStudents){
                stu.attendanceNormal.push(newAttendance)
                await stu.save();
            }
            return createdAttendance;
        } catch (e) {
            return {error: "ERROR_ATTENDANCETODAY_STUDENT_ASSING_NORMAL", reason: e};
        }
    }
    
}

export const studentAttendanceSign = async(dni:IAttendance) => {
    const today = new Date();
    const codeAttendanceToday = today.getDay() + "/" + today.getMonth() + "/"+today.getFullYear();
    try {
        const student = await Student.findOne({dni: dni},{attendanceNormal: 1});
        if(!student)return {error: "STUDENT_NOT_FOUND_ATTENDANCE"};
        
        const sz = student?.attendanceNormal.length-1; 
        if(student.attendanceNormal[sz].state != "C") return {error: "ALREADY_SIGN_STUDENT_ATTENDANCE"}
        const timeNow = new Date();
        const timeLate = new Date();
        let stateAtt = "A";
        timeLate.setHours(8,0,0,0);
        if( timeNow > timeLate) stateAtt = "B";
        student.attendanceNormal[sz].state = stateAtt;
        student.attendanceNormal[sz].timeAtt = timeNow;
        student.save();
        return {state: stateAtt, time: timeNow}
        
    } catch (error) {
        return {error: "ERROR_SING_STUDENT_ATTENDACE", reason: error};
    }
}