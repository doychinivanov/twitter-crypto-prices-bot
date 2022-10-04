declare namespace NodeJS {
  interface ProcessEnv {
    readonly  APP_KEY: string
    readonly  APP_SECRET: string
    readonly  ACCESS_TOKEN: string
    readonly  ACCESS_SECRET: string
    readonly  API_ENDPOINT: string
  }
}
  
export {}