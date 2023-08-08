import NextAuth, { getServerSession } from "next-auth/next"
import Credentials from "next-auth/providers/credentials"
import { UserInfo, remult } from "remult"
const nextAuth = NextAuth({
  providers: [
    Credentials({
      credentials: {
        name: {
          placeholder: "Try Steve or Jane",
        },
      },
      authorize: (info) => findUser(info?.name) || null,
    }),
  ],
  callbacks: {
    session: ({ session }) => ({
      ...session,
      user: findUser(session.user?.name),
    }),
  },
})
export { nextAuth as GET, nextAuth as POST }
const validUsers: UserInfo[] = [
  { id: "1", name: "Jane", roles: ["admin"] },
  { id: "2", name: "Steve" },
]
function findUser(name?: string | null) {
  return validUsers.find((user) => user.name === name)
}
export async function getUserOnServer() {
  const session = await getServerSession()
  return findUser(session?.user?.name)
}
