export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  version: '1.0',
  mysql: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 33061,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/**.entity{.ts,.js}'],
    synchronize: process.env.DB_SYNCHRONIZE,
  },
});
