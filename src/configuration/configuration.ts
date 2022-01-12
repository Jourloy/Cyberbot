import { registerAs } from '@nestjs/config';
import { join } from 'path/posix';
require('dotenv').config();
const env = process.env;
export default registerAs('app', () => ({
	app: {
		port: env.APP_PORT,
	},
	redis: {
		host: env.REDIS_HOST,
		port: env.REDIS_PORT,
	},
	postgres: {
		host: env.POSTGRES_HOST,
		port: parseInt(env.POSTGRES_PORT),
		database: env.POSTGRES_DATABASE,
		username: env.POSTGRES_USERNAME,
		password: env.POSTGRES_PASSWORD,
		entities: join(__dirname, JSON.parse(env.POSTGRES_ENTITIES)[0]),
		synchronize: JSON.parse(env.POSTGRES_SYNCHRONIZE),
		migrationsRun: JSON.parse(env.POSTGRES_MIGRATIONSRUN),
		logging: JSON.parse(env.POSTGRES_LOGGING),
		logger: env.POSTGRES_LOGGER,
		migrations: JSON.parse(env.POSTGRES_MIGRATIONS),
		cli: {
			migrationsDir: env.POSTGRES_CLI_MIGRATIONSDIR,
		},
	},
}));
