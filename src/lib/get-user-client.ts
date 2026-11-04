import { useSession } from "./auth-client";

export default function getUserClient(){
    const {data}=useSession()
    return data
}