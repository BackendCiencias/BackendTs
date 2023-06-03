import TickedC, { ITickedC } from './../models/tickedC.model';

export const generateTickedC = async(tickedC:ITickedC) => {
    const tickedC_Created = await TickedC.create(tickedC);
    return tickedC_Created;
}


export const getAllTickeds = async () =>{
    const allTickeds= await TickedC.find();
    return allTickeds;
}