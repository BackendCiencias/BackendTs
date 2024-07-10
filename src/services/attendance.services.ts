import { Types } from 'mongoose';
import Attendance, { IAttendance } from './../models/attendance.model';
import Student, { IStudent } from './../models/student.model';
import { format, parse, isSaturday, isSunday } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { response } from 'express';

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
    
    type MyStates = "F" | "P" | "T" | "X" | "J";

    let state:MyStates = 'T';
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
const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const timeZone = 'America/Lima';
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, 'hh:mm a');
};

const isModified = (date1: Date, date2: Date): boolean => {
    return (date2.getTime() - date1.getTime()) < 10;
}

export const studentPoputaleAttendance = async(student:IStudent, month:number) => {
    const regex = new RegExp(`^\\d{2}/${month}/${2024}$`);
    const attendances = await Attendance.find({
        student: student._id,
        code: regex
    });

    const filteredAttendances = attendances.filter(attendance => {
        const date = parse(attendance.code, 'dd/MM/yyyy', new Date());
        return !isSaturday(date) && !isSunday(date);
      });
    
    const formatedAttendances = filteredAttendances.map(attendance => ({
        state: attendance.state,
        code: attendance.code,
        date: isModified(attendance.createdAt, attendance.updatedAt) ? "--:-- AM" : formatTime(attendance.updatedAt)
    }));
    return { student, attendances:formatedAttendances }
}