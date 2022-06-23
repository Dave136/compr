import { DataSource } from 'typeorm';

const {
  PGHOST = '127.0.0.1',
  PGPORT = 5432,
  POSTGRES_DB = 'compr',
  POSTGRES_USER = 'compr',
  POSTGRES_PASSWORD = 'compr',
} = process.env;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: PGHOST,
  port: +PGPORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ['./src/models/*.ts'],
  migrations: ['./migration/*.ts'],
});

export default AppDataSource;
