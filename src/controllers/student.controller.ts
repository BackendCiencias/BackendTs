import { updateVacancies } from './../services/classroom.services';
import { generateAttendanceForYear } from './../services/attendance.services';
import { registerPension } from './../services/pension.services';
import { registerStudent, findAllStudents, findStudentById, findStudentByDNI, loginStudent, registerStudentSpecial, modifyStudentByDNI, saveStudentImage, registerBulkStudents} from './../services/student.services';
import { checkVacancies } from '../services/classroom.services';
import { Request , Response, response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { uploadImage } from '../config/cloudinary';
import fs from 'fs-extra'
export const createStudent =  async({body}: Request, res: Response) => {
    try{
        const {pensions} = body;
        const okVacancies = await checkVacancies(body.grade, body.collegue); 
        if(okVacancies == "Invalid grade and collegue") return res.status(400).send({error: okVacancies});
        if(!okVacancies) return res.status(400).send({error: "Sold out vacancies"})

        const responseStudent = await registerStudent(body);
        if(responseStudent){
            const {_id, grade, collegue} = responseStudent;
            await updateVacancies(_id, grade, collegue)
        }

        await generateAttendanceForYear(responseStudent._id);
        console.log("Asistencias creadas");

        if(pensions) await registerPension(pensions, responseStudent._id);   
        
        const actStudent = await findStudentById(responseStudent._id);
        res.send({actStudent, email: responseStudent.email, password: responseStudent.password});
    }catch(e){
        handleHttp(res, 'ERROR_SIGNUP_STUDENT',e);
    }
};

export const createBulkStudents =  async({body}: Request, res: Response) => {
    try{
        // const responseStudent = await registerStudentSpecial();
        const responseStudent = await registerBulkStudents();
        res.status(200).send(responseStudent);
    }catch(e){
        handleHttp(res, 'ERROR_SIGNUP_SPECIAL_BULK_STUDENTS',e);
    }
};

export const getStudents =  async(req: Request, res: Response) => {
    try{
        const responseStudents = await findAllStudents();
        res.send(responseStudents);
    }catch(e){
        handleHttp(res, 'ERROR_GETALL_STUDENT',e);
    }
};

export const getStudentsByParamId =  async(req: Request, res: Response) => {
    try{
        const responseStudents = await findStudentById(req.params.student_id);
        res.send(responseStudents);
    }catch(e){
        handleHttp(res, 'ERROR_STUDENT_PARAM_ID',e);
    }
};

export const getStudentsById = async ({body}: Request, res: Response) => {
    try{
        const responseStudents = await findStudentById(body.student_id);
        res.send(responseStudents);
    }catch(e){
        handleHttp(res, 'ERROR_STUDENT_ID',e);
    }
};

export const getStudentsByDNI = async ({ body }: Request, res: Response) => {
    try {
        const responseStudents = await findStudentByDNI(body.dni);
        res.send(responseStudents);
    } catch (e:any) {
        if (e.message === 'NOT_STUDENT_FOUND_BY_DNI') {
            return res.status(400).send({ error: e.message });
        }
        handleHttp(res, 'ERROR_STUDENT_DNI', e);
    }
};


export const signinStudent = async ({body}: Request, res: Response) => {
    try{
        const {email, password} = body;
        const responseStudent = await loginStudent({email, password});
        console.log("bien")

        if(responseStudent === "CONTRASEÑA_INCORRECTA" || responseStudent === "EMAIL_INCORRECTO"){
            res.status(400)
            return res.send({"error": responseStudent});
        } 
        const {token} = responseStudent;
        
        // sending token
        res.cookie('auth-token', token).json(responseStudent);
    }catch(e){
        handleHttp(res, 'ERROR_SIGNIN_STUDENT',e);
    }
    
};

export const modifyStudentData = async ({body}: Request, res: Response) => {
    try {
      const { dni } = body;
      const modifyData = body;

      const modStudent = await modifyStudentByDNI(dni, modifyData);
  
      if (!modStudent) {
        return res.status(404).json({ error: 'STUDENT_NOT_FOUNDED' });
      }
  
      return res.json(modStudent);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
    }
};

export const modifyStudentImage = async (req: Request, res: Response) => {
    try{
        if(!req.files) return res.status(400).json({error: 'MISING FILES P CTMRE'})
        if(!req.files.image) return res.status(400).json({error: 'MISSING_IMAGE'});
        const {url, public_id} = await uploadImage(req.files.image.tempFilePath);

        await fs.remove(req.files.image.tempFilePath);
        await saveStudentImage(req.body.dni, url, public_id);
        return res.status(200).json({ message: 'SUCCESSFULLY_SAVED_PHOTO' });
    } catch(error){
        return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', errorRaw : error });
    }
}