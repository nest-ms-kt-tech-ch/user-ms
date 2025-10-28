import "dotenv/config";
import * as joi from "joi";

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: number;
}

const envSchema = joi.object({
  PORT: joi.number().default(3001),
  DATABASE_URL: joi.string().required(),
  JWT_SECRET: joi.string().default('defaultsecret'),
  JWT_EXPIRES_IN: joi.number().default(3600),
})
.unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs: EnvVars = {
  PORT: value.PORT,
  DATABASE_URL: value.DATABASE_URL,
  JWT_SECRET: value.JWT_SECRET,
  JWT_EXPIRES_IN: value.JWT_EXPIRES_IN,
};