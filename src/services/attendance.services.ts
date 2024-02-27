import { Types } from 'mongoose';
import Attendance, { IAttendance } from './../models/attendance.model';
import Student, { IStudent } from './../models/student.model';
import { format } from 'date-fns';

export const createAttendanceToday = async(attendance:IAttendance) => {
    const today = new Date();
    const codeToday = format(today, 'dd/MM/yyyy');
    attendance.code = codeToday;
    
    if(attendance.type == 'E'){
        const newIndex = await Attendance.count();
        attendance.code = codeToday + "_E" +  newIndex;
        const createdAttendance = await Attendance.create(attendance);
        const allStudents = await Student.find({}, { attendanceSpecial: 1});
        const newAttendance = {
            idAtt: createdAttendance.id,
            code: createdAttendance.code
        }
        try {
            for(let stu of allStudents){
                stu.attendanceSpecial.push(newAttendance)
                stu.save();
            }
            return createdAttendance;
        } catch (e) {
            return {error: "ERROR_ATTENDANCETODAY_STUDENT_ASSING_SPECIAL", reason: e};
        }
    }else{
        const checkExist = await Attendance.findOne({code: codeToday});
        if(checkExist) return "ERROR_ALREADY_CREADTED_ATTENDANCE";
        const createdAttendance = await Attendance.create(attendance);
        
        const allStudents = await Student.find({}, { attendanceNormal: 1});
        const newAttendance = {
            idAtt: createdAttendance.id,
            code: createdAttendance.code
        }
        try {
            for(let stu of allStudents){
                stu.attendanceNormal.push(newAttendance)
                stu.save();
            }
            return createdAttendance;
        } catch (e) {
            return {error: "ERROR_ATTENDANCETODAY_STUDENT_ASSING_NORMAL", reason: e};
        }
    }
    
}

export const studentAttendanceSign = async(dni:IAttendance) => {
    const today = new Date();
    const codeToday = format(today, 'dd/MM/yyyy');
    try {
        // Nombre apellidos grado foto
        const student = await Student.findOne({dni: dni},{names: 1, grade: 1, attendanceNormal: 1});
        if(!student)return {error: "STUDENT_NOT_FOUND_ATTENDANCE"};
        
        const sz = student?.attendanceNormal.length-1; 
        if(student.attendanceNormal[sz].state != "C") return "ALREADY_SIGN_STUDENT_ATTENDANCE"
        const timeNow = new Date();
        const timeLate = new Date();
        let stateAtt = "A";
        timeLate.setHours(8,0,0,0);
        if( timeNow > timeLate) stateAtt = "B";
        student.attendanceNormal[sz].state = stateAtt;
        student.attendanceNormal[sz].timeAtt = timeNow;
        student.save();
        return {state: stateAtt, time: timeNow, student: student}
        
    } catch (error) {
        return {error: "ERROR_SING_STUDENT_ATTENDACE", reason: error};
    }
}


export const todayAttendance = async() => {
    const today = new Date();
    const codeToday = format(today, 'dd/MM/yyyy');
    console.log("consultando por el codigo: ", codeToday)
    const allAttendances = await Attendance.find({code: codeToday});
    return {
        attendance: allAttendances
    };
}