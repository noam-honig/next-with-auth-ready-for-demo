"use client"

import { SessionProvider } from "next-auth/react"
import { Auth } from "../components/Auth"

export default function Home() {
  return (
    <SessionProvider>
      <Auth />
    </SessionProvider>
  )
}
