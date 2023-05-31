import { loginDirector } from './../services/director.services';
import Director from '../models/director.model';
import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { registerDirector } from '../services/director.services';
import {getSalaryNoPayed, findTeacherById } from '../services/teacher.services';
export const signupDirector =  async({body}: Request, res: Response) => {
    try{
        const responseDirector = await registerDirector(body);
        console.log('already created director')
        res.send(responseDirector);
        // res.send({message: "Success"});
    }catch(e){
        handleHttp(res, 'ERROR_SIGNUP_DIRECTOR',e);
    }
};

export const signinDirector = async ({body}: Request, res: Response) => {
    try{
        const {email, password} = body;
        const responseDirector = await loginDirector({email, password});

        if(responseDirector === "CONTRASEÑA_INCORRECTA" || responseDirector === "EMAIL_INCORRECTO"){
            return res.status(400).send({"error": responseDirector});
        } 
        const {token} = responseDirector;
        
        // sending token
        res.cookie('auth-token', token).json(responseDirector);
    }catch(e){
        handleHttp(res, 'ERROR_SIGNIN_DIRECTOR',e);
    }
};

export const advanceSalary = async ({body}: Request, res: Response) => {
    try{
        const {teacherId, amount} = body;
        const teacherFounded = await findTeacherById(teacherId);
        if(!teacherFounded) return res.status(401).send({"error": "NOT_FOUNDED_TEACHER"});
        const notPayed = await getSalaryNoPayed(teacherId);
        res.send(teacherFounded || '123');
    }catch(e){
        handleHttp(res, 'ERROR_ADVANCE_SALARY',e);
    }
}
