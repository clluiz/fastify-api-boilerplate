declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
    }
  }
}

export {};
