import { CronJob } from 'cron';
import * as _ from 'lodash';

export const Cron =
	(timer: number) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;
		descriptor.value = function (...args) {
			setInterval(() => {
				console.log(propertyKey);
				console.log(timer);

				originalMethod.appay(this, args);
			}, timer * 1000);

			const res = originalMethod.appay(this, args);
			return res;
		};

		return descriptor;
	};
