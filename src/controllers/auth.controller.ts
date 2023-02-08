import Secretary, { ISecretary } from '../models/secretary.model';
import { Request , Response } from 'express';
import jwt from 'jsonwebtoken';
import { token } from 'morgan';

export const signup =  async(req: Request, res: Response) => {
    // saving a new secretary
    const secretary: ISecretary = new Secretary({
        names: req.body.names,
        genre: req.body.genre,
        dni: req.body.dni,
        nationality: req.body.nationality,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
    });
    secretary.password =  await secretary.encryptPassword(secretary.password);
    const savedSecretary = await secretary.save();
    // .catch((error) => {
    //     console.log(error);
    //     res.send("Error en la creación");
    // });
    console.log(savedSecretary);

    //token 
    const token:string = jwt.sign({_id: savedSecretary._id}, process.env.TOKEN_SECRET || 'tokentest' );
    res.header('auth-token',token).json(savedSecretary);
    res.send('signup')
};

export const signin = async (req: Request, res: Response) => {
    const secretary = await Secretary.findOne({email: req.body.email});
    if(!secretary) return res.status(400).json('Email or password is wrong');

    const okPasword: boolean = await secretary.validatePassword(req.body.password);
    if(!okPasword) return res.status(400).json('Invalid Password');
    const token = jwt.sign({_id: secretary._id}, process.env.TOKEN_SECRET || 'tokentest',{
        expiresIn: 60 * 60 *24
    });

    res.header('auth-token', token).json(secretary);
};

export const profile = async (req: Request, res: Response) => {
    const secretary = await Secretary.findById(req.secretaryId, {password: 0});
    if(!secretary) return res.status(404).json('No secretary found');
    res.json(secretary);
};