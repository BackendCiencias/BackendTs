// import { verifyToken } from './../utils/jwt.handle';
// import { NextFunction, Request, Response } from "express"
// import { handleHttp } from '../utils/error.handle';

// interface IPayload{
//     _id: string;
//     iat: number;
//     exp: number;
// }

// export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // ---------- Auth Bearer -------------
//         const jwtByUser =  req.headers.authorization || '';
//         const jwtToken = jwtByUser.split(' ').pop();

//         // ---------- Auth Cookies -------------
//         // const jwtToken =  req.cookies;
//         // const jwtToken =  req.cookies["auth-token"];

//         const isUser = verifyToken(`${jwtToken}`) as IPayload;
//         if(!isUser){
//             res.status(401);
//             res.send("INVALID_SESSION_USER");
//         }else{
//             req.secretaryId = isUser._id;
//             next()
//         }
//     } catch (e) {
//         handleHttp(res, 'INVALID_SESSION',e);
//     }
// }