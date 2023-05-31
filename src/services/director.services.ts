import { createPassword, createEmail } from './../utils/stringPreprocesor';
import { generateToken } from "../middlewares/jwt.handle";
import Director, { IDirector } from "../models/director.model";
import Role, { IRole } from './../models/role.model';
import { Auth } from "interfaces/auth";
export const registerDirector = async(director:IDirector) => {
  const createdDirector = await Director.create(director);
  createdDirector.password = await createdDirector.encryptPassword(createdDirector.password);
  const role = await Role.findOne({name: "director"});
  createdDirector.roles = [role?._id];
  const savedDirector = await createdDirector.save();
  const {_id, email, names}  = savedDirector;

  const data = {_id, email, names};
  const token = generateToken(`${_id}`);

  return {token, data};
  // return {"message": "Prohibido crear directores nuevos, contacte a servicio tecnico :P"};
}

export const loginDirector = async ({ email, password }: Auth) => {
  const director = await Director.findOne({ email });
  if (!director) return "EMAIL_INCORRECTO";
  const isCorrect: boolean = await director.validatePassword(password); //validate in utils?
  if (!isCorrect) return "CONTRASEÑA_INCORRECTA";

  const data = { email: director.email, names: director.names, _id: director._id }
  const token = generateToken(`${director._id}`);
  
  return {token , data};
};
