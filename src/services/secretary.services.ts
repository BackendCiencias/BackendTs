import { generateToken } from "./../utils/jwt.handle";
import Secretary, { ISecretary } from "../models/secretary.model";
import { Auth } from "interfaces/auth";
export const registerSecretary = async (secretary: ISecretary) => {
  // const checkIs = await Secretary.findOne({email: secretary.email})
  // if(checkIs) return "ALREADY_USER";

  const createdSecretary = await Secretary.create(secretary);
  createdSecretary.password = await createdSecretary.encryptPassword(
    createdSecretary.password
  );
  const savedSecretary = await createdSecretary.save();
  return savedSecretary;
};

export const loginSecretary = async ({ email, password }: Auth) => {
  const secretary = await Secretary.findOne({ email });
  if (!secretary) return "EMAIL_INCORRECT";

  const isCorrect: boolean = await secretary.validatePassword(password); //validate free?
  if (!isCorrect) return "PASSWORD_INCORRECT";

  const data = { email: secretary.email, names: secretary.names, _id: secretary._id }

  const token = generateToken(secretary.id);
  return {
    token,
    data
  };
};
