import { Types } from 'mongoose';
import Attendance, { IAttendance } from './../models/attendance.model';
import Student, { IStudent } from './../models/student.model';
import { format } from 'date-fns';

export const generateAttendanceForYear = async(studentId:Types.ObjectId) => {
    const year = new Date().getFullYear();
    console.log(year);
    const attendance = [];
    for (let month = 0; month < 12; month++) {
        for (let day = 1; day <= daysInMonth(month, year); day++) {
            const code = format(new Date(year, month, day), 'dd/MM/yyyy');
            attendance.push({ student: studentId, code});
        }
    }
    await Attendance.insertMany(attendance);
}

function daysInMonth(month:number, year:number) {
    return new Date(year, month + 1, 0).getDate();
}

export const markAttendance = async(dni:string) => {
    try {
        const studentFounded = await Student.findOne({dni});
        if(!studentFounded) throw new Error('STUDENT_NOT_FOUND_ATTENDANCE');
        
        const timeArrive = new Date();
        const code = format(timeArrive, 'dd/MM/yyyy');
        const responseAttendance = await Attendance.findOne({student: studentFounded?._id, code});
        if(!responseAttendance) return 'NOT_FOUND_MATCH_ATTENDANCE_STUDENT';
        const hoursArrive = timeArrive.getHours();
        if(responseAttendance.state != 'F') return 'ALREADY_SIGN_STUDENT_ATTENDANCE';
        var fechaUTC = new Date(timeArrive);
        fechaUTC.setHours(fechaUTC.getHours() - 5);
        responseAttendance.date = fechaUTC;
        responseAttendance.state = (hoursArrive < 8) ? 'P' : 'T';
        const savedAttendance = await responseAttendance.save();
        return {
            state: savedAttendance.state,
            names: studentFounded?.names,
            grade: studentFounded?.grade
        }
    } catch (e) {
        return {error: "ERROR_SING_STUDENT_ATTENDACE", reason: e};
    }
}