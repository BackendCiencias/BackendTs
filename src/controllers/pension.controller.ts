import { payMonthPension } from "../services/pension.services";
import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';

export const payPension = async ({body}: Request, res: Response) => {
    try{
        const {idStudent, month} = body;
        const payedPension = await payMonthPension(idStudent, month);
        console.log(payedPension);
        res.status(200).send(payedPension)
        // if(payedPension === "CONTRASEÑA_INCORRECTA" || responseSecretary === "EMAIL_INCORRECTO"){
        //     res.status(400)
        //     return res.send({"error": responseSecretary});
        // } 
    }catch(e){
        handleHttp(res, 'ERROR_SECRETARY_MONTH_PENSION',e);
    }
    
};