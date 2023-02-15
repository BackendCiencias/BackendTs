import { registerContract } from './../services/contract.services';
import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
export const createContract =  async({body}: Request, res: Response) => {
    try{
        const {tutorsDNI, studentsDNI} = body;
        const contractResponse = await registerContract(tutorsDNI, studentsDNI);
        if(contractResponse == "TUTORS_DNI_IS_EMPTY" || contractResponse == "STUDENTS_DNI_IS_EMPTY"){
            return res.status(400).send({"error": contractResponse});
        }
        res.send(contractResponse);
    }catch(e){
        handleHttp(res, 'ERROR_SIGNUP_CONTRACT',e);
    }
};