import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const { signIn, signUp,signOut,token, useSession } = createAuthClient({
  plugins: [
    jwtClient() 
  ]
})