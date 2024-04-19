import { Types } from 'mongoose';
import Attendance, { IAttendance } from './../models/attendance.model';
import Student, { IStudent } from './../models/student.model';
import { format } from 'date-fns';

export const generateAttendanceForYear = async(studentId:Types.ObjectId) => {
    const year = new Date().getFullYear();
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
    const studentFounded = await Student.findOne({dni});
    if(!studentFounded) throw new Error('STUDENT_NOT_FOUND_ATTENDANCE');
    
    const timeArrive = new Date();
    timeArrive.setHours(timeArrive.getHours() - 5);
    const hoursArrive = timeArrive.getHours();
    const code = format(timeArrive, 'dd/MM/yyyy');

    const responseAttendance = await Attendance.findOne({student: studentFounded?._id, code});
    if(!responseAttendance) throw new Error('NOT_FOUND_MATCH_ATTENDANCE_STUDENT');
    
    if(responseAttendance.state != 'F') throw new Error('ALREADY_SIGN_STUDENT_ATTENDANCE');
    responseAttendance.date = timeArrive;
    
    let state = 'T';
    if(hoursArrive < 8) state = 'P';
    else if(hoursArrive == 8) state = (timeArrive.getMinutes() <= 5 ? 'P' : 'T')
    responseAttendance.state = state;
    
    const savedAttendance = await responseAttendance.save();
    return {
        state: savedAttendance.state,
        date: savedAttendance.date,
        names: studentFounded?.names,
        grade: studentFounded?.grade
    }
}