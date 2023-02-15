import { Chore } from "./Chore";
import { User } from "./User";

export class House {
	private houseName: string;
	private chores: Chore[];
	private houseManager: User;
	private participants: User[];

	constructor(
		houseName: string,
		chores: Chore[],
		houseManager: User[],
		participants: User[]
	) {
		this.houseName = houseName;
		this.chores = chores;
		this.houseManager = houseManager[0];
		this.participants = participants;
	}
}
