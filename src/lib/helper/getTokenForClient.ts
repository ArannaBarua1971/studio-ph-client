import { token } from "../auth-client";

export default async function getTokenForClient(){
    const {data,error}=await token()
    return data?.token
}