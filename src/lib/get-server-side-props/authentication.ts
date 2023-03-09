import { GetServerSidePropsContext, PreviewData } from "next";
import { getServerSession, Session } from "next-auth";
import { authOptions as nextAuthOptions } from '@/pages/api/auth/[...nextauth]';
import { ParsedUrlQuery } from "querystring";


export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return await getServerSession(ctx.req, ctx.res, nextAuthOptions);
};
export async function isAuthenticated (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, callback: (session: Session) => any) {
  const session = await getServerAuthSession(context);

  if (session === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/401'
      }
    };
  }

  return callback(session);
}
