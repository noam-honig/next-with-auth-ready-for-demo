"use client"

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react"
import Todo from "../components/todo"
import { useEffect } from "react"
import { UserInfo, remult } from "remult"

export default function Home() {
  return (
    <SessionProvider>
      <Auth />
    </SessionProvider>
  )
}

export function Auth() {
  const session = useSession()
  useEffect(() => {
    remult.user = session.data?.user as UserInfo
  }, [session])
  if (session.status === "loading") return <>loading</>
  return (
    <>
      {session.status === "authenticated" ? (
        <button onClick={() => signOut()}>sign out</button>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
      <Todo />
    </>
  )
}
