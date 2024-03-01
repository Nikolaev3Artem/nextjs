export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|public|images|icons|meta|favicon.ico).*)',
  ],
};

import { chain } from '@/middlewares/chain';
import { withAuthMiddleware } from '@/middlewares/middleware1';
import { withI18nMiddleware } from '@/middlewares/middleware2';

export default chain([withAuthMiddleware, withI18nMiddleware]);
