import express from "express";
import configure from "./config";
import createDbConnection from "./databases/connection";
import AppRoute from './routes'
export async function app() {
    configure();
    try {
        const connection = await createDbConnection();
        const app = express();
        if (connection.isConnected) {
            console.log(`Connected to ${process.env.DB_DRIVER} database at ${process.env.DB_HOST}`);
            app.use(express.json());
            app.use(express.urlencoded());
            app.use(AppRoute);
        } else {
            throw new Error(`Connected failed to ${process.env.DB_HOST}`);
        }
        return app;
    } catch (e) {
        throw e;
    }
}
