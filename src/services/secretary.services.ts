import { generateToken } from "../middlewares/jwt.handle";
import Secretary, { ISecretary } from "../models/secretary.model";
import Role, { IRole } from './../models/role.model';
import { Auth } from "interfaces/auth";

export const registerSecretary = async (secretary: ISecretary) => {
  const createdSecretary = await Secretary.create(secretary);
  createdSecretary.password = await createdSecretary.encryptPassword(createdSecretary.password);
  const role = await Role.findOne({name: "secretary"});
  createdSecretary.roles = [role?._id];
  const savedSecretary = await createdSecretary.save();
  const {_id, email, names}  = savedSecretary;

  const data = {_id, email, names};
  const token = generateToken(`${_id}`);

  return {token, data};
};

export const loginSecretary = async ({ email, password }: Auth) => {
  const secretary = await Secretary.findOne({ email }).populate('roles');
  const readyRoles: string[] = [];
  
  if (!secretary) return "EMAIL_INCORRECTO";

  for (let r of secretary?.roles) {
    const role = await Role.findById(r);
    if (role) readyRoles.push(role.name);
  }

  const isCorrect: boolean = await secretary.validatePassword(password);
  if (!isCorrect) return "CONTRASEÑA_INCORRECTA";

  const data = { email: secretary.email, names: secretary.names, _id: secretary._id, rol: readyRoles };
  console.log(data.rol);

  const token = generateToken(`${secretary._id}`);
  
  return { token, data };
};
