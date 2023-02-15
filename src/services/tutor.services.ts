import Tutor, { ITutor } from './../models/tutor.model';

export const registerTutor = async(tutor:ITutor) => {
    const tutorCreated = await Tutor.create(tutor);
    const savedSecretary = await tutorCreated.save();
    return savedSecretary;
}


export const findTutorByDNI = async(tutorDNI:string) => {
    console.log(tutorDNI);
    const tutorTarget = await Tutor.findOne({"dni": tutorDNI});
    if(!tutorTarget) return "NOT_TUTOR_FOUNDED_BY_DNI";
    return tutorTarget;
}