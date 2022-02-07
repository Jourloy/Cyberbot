/* IMPORTS */
import configuration from '../configuration/configuration';
import { DiscordUser } from '../entity/discord.entity';
import { createConnection, Connection, Repository } from 'typeorm';
import { DatabaseTypes } from 'types';

export class Database {
	private connection: Connection;
	private config = configuration;

	public async CreateConnection() {
		this.connection = await createConnection({
			type: 'postgres',
			host: this.config.postgres.host,
			port: this.config.postgres.port,
			username: this.config.postgres.username,
			password: this.config.postgres.password,
			database: this.config.postgres.database,
			entities: [__dirname + '/../**/*.entity{.ts,.js}'],
			synchronize: false,
			migrationsRun: false,
			logging: false,
			migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
			cli: {
				migrationsDir: 'src/database/migrations',
			},
		});
		return this.connection;
	}
}

export class DiscordDatabase {
	private connection: Connection;
	private repository: Repository<DiscordUser>;

	constructor(connection: Connection) {
		this.connection = connection;
		this.repository = this.connection.getRepository(DiscordUser);
	}

	/**
	 * Find and return all discord users
	 */
	private async findAll(): Promise<DiscordUser[]> {
		return await this.repository.find();
	}

	/**
	 * Find and return discord user by ID
	 */
	private async findOne(id: number): Promise<DiscordUser> {
		return await this.repository.findOne(id);
	}

	/**
	 * Find and return discord user by UserID
	 */
	public async findOneByUserID(id: string): Promise<DiscordUser> {
		return await this.repository.findOne({ userID: id });
	}

	/**
	 * Insert a new user in discord database
	 */
	public async insertOne(user: DiscordUser): Promise<DatabaseTypes.Result> {
		if (await this.findOneByUserID(user.userID)) {
			return { error: true, errorMessage: 'This user already exist in database' };
		}
		await this.repository.insert(user);
		return { error: false };
	}

	/**
	 * Add one message to user
	 */
	public async addMessage(id: string, amount?: number) {
		const user = await this.findOneByUserID(id);
		if (!amount) amount = 1;
		if (!user) {
			user.userID = id;
			user.warnings = 0;
			user.bans = 0;
			user.messages = amount;
		} else user.messages += amount;
		await this.repository.save(user);
	}

	/**
	 * Add one second in voice to user
	 */
	public async addSecond(id: string) {
		const user = await this.findOneByUserID(id);
		if (!user) {
			user.userID = id;
			user.warnings = 0;
			user.bans = 0;
			user.messages = 0;
			user.minutesInVoice = 1;
		} else user.minutesInVoice++;
		await this.repository.save(user);
	}
}
