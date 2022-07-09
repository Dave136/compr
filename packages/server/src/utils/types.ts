export interface Payload {
  email: string;
  sub: number;
}

export enum Variables {
  PgHost = 'PGHOST',
  PgPort = 'PGPORT',
  PgDB = 'POSTGRES_DB',
  PgUser = 'POSTGRES_USER',
  PgPassword = 'POSTGRES_PASSWORD',
  PgSSL = 'POSTGRES_SSL_SELF',
}
