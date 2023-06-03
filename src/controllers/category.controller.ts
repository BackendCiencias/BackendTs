import { handleHttp } from '../utils/error.handle';
import Category, { ICategory } from '../models/category.model';
import { Request , Response } from 'express';
import { getAllCategories, registerCategory} from '../services/category.services';

export const getCategories = async (req:Request, res:Response) => {
    try {
        const responseVacancies = await getAllCategories();
        res.send(responseVacancies);
    } catch (e) {
        handleHttp(res, 'ERROR_GETALL_CATEGORY', e)
    }
}

export const createCategory = async ({body}:Request, res:Response) => {
    try {
        console.log(body.name)
        const responseCreate = await registerCategory(body.name);
        res.send(responseCreate);
    } catch (e) {
        handleHttp(res, 'ERROR_CREATE_CATEGORY', e)
    }
}