import "dotenv/config";
import * as joi from "joi";

interface EnvVars {
    PORT: number;
}

const envSchema = joi.object({
    PORT: joi.number().default(3000),
})
.unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const envs: EnvVars = {
    PORT: value.PORT,
};