import { getAllVacancies, getVacanciesByCollegue, registerVacancies } from './../services/classroom.services';
import { handleHttp } from '../utils/error.handle';
import Classroom, { IClassroom } from '../models/classroom.model';
import { Request , Response } from 'express';

export const getVacancies = async (req:Request, res:Response) => {
    try {
        const responseVacancies = await getAllVacancies();
        res.send(responseVacancies);
    } catch (e) {
        handleHttp(res, 'ERROR_VACANCIES', e)
    }
}

export const collegueVacancies = async ({body}:Request, res:Response) => {
    try {
        const responseVacancies = await getVacanciesByCollegue(`${body.collegue}`);
        res.send(responseVacancies);
    } catch (e) {
        handleHttp(res, 'ERROR_VACANCIES', e)
    }
}

export const generateAllVacancies = async ({body}:Request, res:Response) => {
    try {
        const responseCreate = await registerVacancies(body.classrooms);
        res.send(responseCreate);
    } catch (e) {
        handleHttp(res, 'ERROR_CREATE_VACANCIES', e)
    }
}