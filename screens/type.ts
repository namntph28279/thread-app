
import { JwtPayload } from 'jwt-decode';

export interface UserData {
    _id: string;
    email: string;
    name: string;
    password: string;
    joindDate: string;
    verified: boolean;
    receivedFollowRequests: string[];
    sentFollowRequests: string[];
    followers: string[];
    __v: number;
}

export interface MyJwtPayload extends JwtPayload {
    userId: string;
}