import { generateToken } from "./../utils/jwt.handle";
import Secretary, { ISecretary } from "../models/secretary.model";
import { Auth } from "interfaces/auth";
export const registerSecretary = async (secretary: ISecretary) => {
  // const checkIs = await Secretary.findOne({email: secretary.email})
  // if(checkIs) return "ALREADY_USER";

  const createdSecretary = await Secretary.create(secretary);
  createdSecretary.password = await createdSecretary.encryptPassword(createdSecretary.password);
  
  const savedSecretary = await createdSecretary.save();
  const {_id, email, names}  = savedSecretary;

  const data = {_id, email, names};
  const token = generateToken(`${_id}`);

  return {token, data};
};

export const loginSecretary = async ({ email, password }: Auth) => {
  const secretary = await Secretary.findOne({ email });
  if (!secretary) return "EMAIL_INCORRECTO";

  const isCorrect: boolean = await secretary.validatePassword(password); //validate in utils?
  if (!isCorrect) return "CONTRASEÑA_INCORRECTA";

  const data = { email: secretary.email, names: secretary.names, _id: secretary._id }
  const token = generateToken(`${secretary._id}`);
  
  return {token , data};
};
