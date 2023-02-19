import dotenv from "dotenv/config";

export interface Config {
  apiPort: number;
  apiEnv: string;
  apiSecretKey: string;
  jwtPrivateKey: string;
}

const config: Config = {
  apiPort: Number(process.env.API_PORT),
  apiEnv: String(process.env.API_ENV),
  apiSecretKey: String(process.env.API_SECRET_KEY),
  jwtPrivateKey: String(process.env.JWT_PRIVATE_KEY),
};

export default config;
