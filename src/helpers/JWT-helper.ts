import { sign, JwtPayload, verify } from 'jsonwebtoken';
import { Request } from 'express';

const SECRET = process.env.SECRET as string;

export function gen_token(id: number) {
    return sign({ user: { id } }, SECRET)
}

export function verify_auth(req: Request, id?: number){
    const auth_token = req.headers.authorization;
    if(auth_token){
        const JWT= auth_token.replace('Bearer ','')
        const JWTP = verify(JWT as string, SECRET) as JwtPayload;
        if (id && JWTP.user.id != id) {
            throw new Error("can't show this data for this user");
        }
    }else{
    throw new Error('authorization token not provided')
    }
}