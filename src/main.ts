import { Database } from './database/database';
import { Discord } from './discord/discord';

(async () => {
	const database = new Database();
	const connection = await database.CreateConnection();
	new Discord(connection);
})();
