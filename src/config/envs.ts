import 'dotenv/config';
import * as joi from 'joi';

interface envVars {
  PORT: number;
  PRODUCTS_MS_HOST: string;
  PRODUCTS_MS_PORT: number;
}

const envsSchema = joi
  .object<envVars>({
    PORT: joi.number().required(),
    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: envVars = value;

export const envs = {
  PORT: envsVars.PORT,
  PRODUCTS_MS_HOST: envsVars.PRODUCTS_MS_HOST,
  PRODUCTS_MS_PORT: envsVars.PRODUCTS_MS_PORT,
};
