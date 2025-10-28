import "dotenv/config";
import * as joi from "joi";

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
}

const envSchema = joi.object({
  PORT: joi.number().default(3001),
  DATABASE_URL: joi.string().required(),
})
.unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs: EnvVars = {
  PORT: value.PORT,
  DATABASE_URL: value.DATABASE_URL,
};