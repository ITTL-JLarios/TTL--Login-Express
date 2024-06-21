import express from 'express';
import cors from 'cors';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import initializeDb from './db/index.js';
import timeRouter from './routes/timeclock.js';
const port = process.env.PORT || 3000;
const allowedOrigins = ['*'];
const corsOptions = {
    origin: allowedOrigins
};
const start = async () => {
    const app = express();
    await initializeDb();
    const admin = new AdminJS(options);
    if (process.env.NODE_ENV === 'production') {
        await admin.initialize();
    }
    else {
        admin.watch();
    }
    const router = buildAuthenticatedRouter(admin, {
        cookiePassword: process.env.COOKIE_SECRET,
        cookieName: 'adminjs',
        provider,
    }, null, {
        secret: process.env.COOKIE_SECRET,
        saveUninitialized: true,
        resave: true,
    });
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(admin.options.rootPath, router);
    app.use('/report', timeRouter);
    app.listen(port, () => {
        console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
    });
};
start();
