import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	JoinColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from 'typeorm';
import { GameUser } from './game.entity';

@Entity()
export class DiscordUser {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userID: string;

	@Column()
	warnings: number;

	@Column()
	bans: number;

	@Column({ default: false })
	isMuted: string;

	@Column({ nullable: true })
	mutedExpires: Date;

	@Column({ default: 0 })
	messages: number;

	@Column({ default: 0 })
	minutesInVoice: number;

	@Column({ nullable: true })
	color: string;

	@JoinColumn()
	gameUser: GameUser;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}

@Entity()
export class DiscordLog {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	service: string;

	@Column({ default: 100 })
	code: number;

	@Column()
	description: string;

	@Column({ default: false })
	isRequestAttention: Boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}
