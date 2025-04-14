'use server'

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";


export async function signUp(params: SignUpParams){
const {uid, name, email} = params;

try{
    const userRecord = await db.collection('users').doc(uid).get();

    if(userRecord.exists){
        return{
            success: false,
            message: "User already exists, Please sign in instead."
        }
    }
    await db.collection('users').doc(uid).set({
        name, email
    })

    return{
        success: true,
        message: 'Account created successfully. Please sign in'
    }

}catch(e: any){
    console.error("Error creating user", e);
    if(e.code === 'auth/email-already-exists'){
        return{
            success:false,
            message: 'This email is already in use.'
        }
    }
    return{
        success: false,
        message: 'Failed to create an account'
    }
}
}

export async function setSessionCookie(idToken:string){
    const cookieStore = await cookies();
    const ONE_WEEK = 60*60*24*7

    const sessionCookie = await auth.createSessionCookie(idToken,{
        expiresIn: ONE_WEEK*1000,
    })
    cookieStore.set('session', sessionCookie,{
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: "lax",

    })

}

export async function signIn(params: SignInParams){
    const {email, idToken} = params;
try {
    const userRecord = await auth.getUserByEmail(email)

    if(!userRecord){
        return{
            success: false,
            message: "No account with this details, Please sign up"
        }
    }

   await setSessionCookie(idToken);
} catch (e) {
    console.error(e);

    return{
        success: false,
        message: 'Failed to log into account'
    }
}
    
}