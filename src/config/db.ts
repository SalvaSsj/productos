import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [path.resolve(__dirname, '../models')],
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

export default db;
