import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../data/auth';
import { Role } from '../types/roles';

export interface JWTPayload {
    username: string;
    role: Role;
}

export const signToken = (payload: JWTPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JWTPayload => {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
};
