import { House } from "./House";
import { User } from "./User";

export class Chore {
	private title: string;
	private houses: House[];
	private users: User[];

	constructor(title: string, houses: House[], users: User[]) {
		this.title = title;
		this.houses = houses;
		this.users = users;
	}
}
