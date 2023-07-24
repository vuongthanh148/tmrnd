import * as process from 'process';

export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  app: {
    port: parseInt(process.env.PORT) || 2711,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
  },
});
