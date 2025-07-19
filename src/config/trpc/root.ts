import { router } from './init';
import { authRouter } from './routers/auth';
import { dataRouter } from './routers/data';
import { adminRouter } from './routers/admin';

export const appRouter = router({
  auth: authRouter,
  data: dataRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
