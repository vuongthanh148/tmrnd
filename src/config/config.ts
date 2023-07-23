export const config = () => ({
  PORT: parseInt(process.env.PORT) || 2711,
  API_SERVER_HOST: process.env.API_SERVER_HOST || 'http://apiserver:8000/v1',
  API_KEY:
    process.env.API_KEY ||
    '222f84bd004b923a312b903637d0a96979d3dca06b9df81284c7426b2feb28bc',
  BUILD_ENVIRONMENT: process.env.BUILD_ENVIRONMENT || 'windows',
});
