import Tutor, { ITutor } from './../models/tutor.model';

export const registerTutor = async(tutor:ITutor) => {
    const tutorCreated = await Tutor.create(tutor);
    const savedSecretary = await tutorCreated.save();
    return savedSecretary;
}