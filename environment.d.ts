declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT?: string;
        MONGO_URI: string;
        CHAT_ID_ADMIN: 'development' | 'production';
        BOT_TOKEN: string;
      }
    }
  }
  
  // File này cần được export một cái gì đó để TS coi nó là module
  export {};
  