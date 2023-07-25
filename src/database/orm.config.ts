import { config } from 'dotenv';
config({ path: 'src/config/env/development.env' });

import { DataSource } from 'typeorm';
export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['src/database/migrations/**/*.ts'],
});
