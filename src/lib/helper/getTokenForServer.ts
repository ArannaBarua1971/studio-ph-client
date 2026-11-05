import { headers } from "next/headers";
import { auth } from "../auth";

export default async function getTokenForServer(){
    const token=await auth.api.getToken({headers:await headers()})
    return token.token
}