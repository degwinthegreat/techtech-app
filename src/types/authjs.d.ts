import { DefaultSession } from "@auth/core/types";
declare module '@auth/core/types' {
  interface Session {
    user: {
      //id等を追加する場合
      id:string
    } & DefaultSession.user
  }
}
