import NextAuth, { getServerSession } from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { UserInfo, remult } from "remult";
const nextAuth = NextAuth({
  providers: [
    Credentials({
      credentials: {
        name: {
          placeholder: "Try Steve or Jane",
        },
      }, // build slowly

      authorize: (info) => findUser(info?.name) || null,
    }),
  ],
});
export { nextAuth as GET, nextAuth as POST };
const validUsers: UserInfo[] = [
  // build slowly
  { id: "1", name: "Jane" },
  { id: "2", name: "Steve" },
];
function findUser(name?: string | null) {
  return validUsers.find((user) => user.name === name);
}
export async function getUserOnServer() {
  const session = await getServerSession();
  return findUser(session?.user?.name);
}
