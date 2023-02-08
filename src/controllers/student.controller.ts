import { IStudent } from './../models/student.model';
import { Request , Response } from 'express';
import Student from '../models/student.model';
export const createStudent =  async(req: Request, res: Response) => {
    console.log(req.body);
    const student: IStudent = new Student({
        names: req.body.names,
        genre: req.body.genre,
        dni: req.body.dni,
        nationality: req.body.nationality,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        origin: req.body.origin,
        grade: req.body.grade,
        collegue: req.body.collegue,
    });

    
    // FALTA HACER FUNCIONES PARA ESTOS: 
    // pension: [ Types.ObjectId];
    // tutor: [ Types.ObjectId];
    // contracts: [ Types.ObjectId];
    const savedStudent = await student.save();
    console.log(savedStudent);
    res.send('create student')
};