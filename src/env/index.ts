import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid Enviroment Variables', _env.error)
  throw new Error('Invalid Enviroment Variables')
}

export const env = _env.data