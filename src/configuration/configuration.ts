import { join } from 'path/posix';
require('dotenv').config();
const env = process.env;
export default {
	app: {
		port: env.APP_PORT,
	},
	discord: {
		token: env.DISCORD_TOKEN,
		guildID: env.DISCORD_GUILD,
		modRoleID: env.DISCORD_MOD_ROLE_ID,
		adminID: env.DISCORD_ADMIN_ID,
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
};
