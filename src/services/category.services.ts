import { Types } from 'mongoose';
import Category, { ICategory } from './../models/category.model';

export const getAllCategories = async () =>{
    const allCategory = await Category.find();
    return allCategory;
}

export const registerCategory  = async (name:ICategory[]) =>{
    const categoryCreated = await Category.create({name});
    return categoryCreated;
}