import { sign, JwtPayload, verify } from 'jsonwebtoken';
import { Request } from 'express';

const SECRET = process.env.SECRET as string;

export function gen_token(id: number) {
    return sign({ user: { id } }, SECRET)
}

export function verify_auth(req: Request, id?: number){
    const authorization = req.headers.authorization;
    if(authorization){
        const JWT= authorization.replace('Bearer ','')
        const JWTP = verify(JWT as string, SECRET) as JwtPayload;
        if (id && JWTP.user.id != id) {
            throw new Error("can't show this data for this user");
        }
    }else{
    throw new Error('authorization not provided')
    }
}