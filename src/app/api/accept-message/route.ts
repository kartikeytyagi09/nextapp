import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import dbConnect from '@/lib/db';
import UserModel from '@/model/user';
import { User } from 'next-auth';

export async function POST(req:Request){

    const session= await getServerSession(authOptions)
}