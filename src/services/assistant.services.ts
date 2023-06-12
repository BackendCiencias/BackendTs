import { createPassword, createEmail } from '../utils/stringPreprocesor';
import Assistant, { IAssistant } from '../models/assistant.model';
import Role, { IRole } from '../models/role.model';
import { IPayment } from 'models/payment.model';
import { Auth } from "interfaces/auth";
import { generateToken } from "../middlewares/jwt.handle";

export const registerAssistant = async(assistant:IAssistant) => {
    const {dni, names} = assistant;
    const {name1, name2, surname1, surname2} = names;
    const createdEmail:string =  createEmail(name1, surname1, surname2);
    const literalPassword:string = createPassword(dni,name1, name2, surname1, surname2);
    assistant.password = literalPassword;
    assistant.email = createdEmail;
    const role = await Role.findOne({name: "assistant"});
    assistant.roles = [role?._id];
    const assistantCreated = await Assistant.create(assistant);
    assistantCreated.password = await assistantCreated.encryptPassword(literalPassword);
    const savedAssistant = await assistantCreated.save();
    console.log(savedAssistant);
    return {
        _id : savedAssistant._id,
        email: createdEmail,
        password: literalPassword
    };
}

export const loginAssistant = async ({ email, password }: Auth) => {
    const assistant = await Assistant.findOne({ email });
    if (!assistant) return "EMAIL_INCORRECTO";
    const isCorrect: boolean = await assistant.validatePassword(password); //validate in utils?
    if (!isCorrect) return "CONTRASEÑA_INCORRECTA";
  
    const data = { email: assistant.email, names: assistant.names, _id: assistant._id }
    const token = generateToken(`${assistant._id}`);
    
    return {token , data};
  };
  
export const modifyAssistant = async(assistant:IAssistant) => {
    // if(!assistant.dni) return "MISSSING_DNI";
    // const isAlready = await Assistant.findOne({"dni": assistant.dni});
    // if(isAlready) return "ASSISTANT";
    const {dni, names} = assistant;
    const {name1, name2, surname1, surname2} = names;
    const createdEmail:string =  createEmail(name1, surname1, surname2);
    // const createdEmail:string = "alumno2madero@cienciasperu.edu.pe";
    // const okEmail = await Assistant.find({email: createdEmail}).select('email')
    // console.log(okEmail);
    const createdPassword:string = createPassword(dni,name1, name2, surname1, surname2);
    assistant.email = createdEmail;
    assistant.password = createdPassword;
    const assistantCreated = await Assistant.create(assistant);
    const savedAssistant = await assistantCreated.save();
    return savedAssistant;
}

export const findAssistantById = async(assistantId:string) => {
    const assistantTarget = await Assistant.findById(assistantId, {password: 0}).populate<{ payment: IPayment }>("payment");
    if(!assistantTarget) return "NOT_ASSISTANT_FOUNDED_BY_ID";
    return assistantTarget;
}

export const findAssistantByDNI = async(assistantDNI:string) => {
    console.log(assistantDNI);
    const assistantTarget = await Assistant.findOne({"dni": assistantDNI}).populate("payment");
    if(!assistantTarget) return "NOT_ASSISTANT_FOUNDED_BY_DNI";
    return assistantTarget;
}

export const getAllAssistants  = async () =>{
    const allAssistant= await Assistant.find();
    return allAssistant;
}

export const getSalaryNoPayed = async(assistantId:string) => {
    // let acum = 0;
    // const assistantFounded = await findAssistantById(assistantId);
    // if(assistantFounded === "NOT_ASSISTANT_FOUNDED_BY_ID") throw new Error('NO ASSISTANT FOUND');
    // const year = new Date().getFullYear();
    // const paymentAct = assistantFounded.payment.find(e => e.year == year);
    // if(!paymentAct) throw new Error('NO PAYMENT FOUND');
    // const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    // for (let month of months){
    //     console.log(paymentAct[`${month}`]);
    //     acum += paymentAct[month]["total"];
    //     acum -= paymentAct[month]["payed"];
    // }
    // console.log(acum);
}