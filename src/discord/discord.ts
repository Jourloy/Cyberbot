/* IMPORTS */
import * as ds from 'discord.js';
import { CronJob } from 'cron';

/* PARAMS */

/* CLASSES */
export class Discord {
	private client: ds.Client;
	private guild: ds.Guild;

	private cronLogin: CronJob;

	public async init() {
		await this.login();
		if (!this.client) {
			this.cronLogin = new CronJob('*/30 * * * * *', this.login, null, true);
		}
	}

	private async login() {
		if (this.client) {
			this.cronLogin.stop();
		}
	}
}
