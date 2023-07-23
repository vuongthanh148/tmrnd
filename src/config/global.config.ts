import * as process from 'process';

export const GlobalConfig: Configs = {
  app: {
    port: parseInt(process.env.PORT) || 2711,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10)
  },
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  }
}

export type Configs = {
  app: AppConfig;
  auth: AuthConfig;
  redis: RedisConfig;
  postgres: PostgresConfig;
};

export type AppConfig = {
  port: number;
};
export type AuthConfig = {
  jwtSecret: string
};
export type RedisConfig = {
  host: string;
  port: number;
};
export type PostgresConfig = {
  host: string;
  port: number;
  username?: string;
  password?: string;
  database?: string;
};
