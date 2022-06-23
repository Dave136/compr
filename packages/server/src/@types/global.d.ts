declare namespace NodeJS {
  export type Environment = 'production' | 'development' | 'testing';

  export interface ProcessEnv {
    PORT: string;
    PGHOST: string;
    PGPORT: number;
    NODE_ENV: Environment;
    POSTGRES_DB: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
  }
}
