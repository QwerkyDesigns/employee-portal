import { GetServerSidePropsContext, PreviewData } from 'next';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ParsedUrlQuery } from 'querystring';

export const getServerAuthSession = async (ctx: { req: GetServerSidePropsContext['req']; res: GetServerSidePropsContext['res'] }) => {
    return await getServerSession(ctx.req, ctx.res, authOptions);
};

export async function isAuthenticated(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, callback: (session: Session) => any) {
    const session = await getServerAuthSession(context);

    if (session === null) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        };
    }

    return callback(session as any);
}

export async function getServerSideProps(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {
    return await isAuthenticated(context, (session) => {
        return {
            props: {
                session
            }
        };
    });
}
