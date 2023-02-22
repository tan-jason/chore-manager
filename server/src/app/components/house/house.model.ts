import { Chore } from "../chore/chore.model";
import { User } from "../user/user.model";
import { HouseUser } from "../houseuser/houseuser.model";

export class House {
	private id: Number;
	private name: string;
	private houseOwner: User;
	private chores: Chore[];
	private users: HouseUser[];

	constructor(id: Number, name: string, houseOwner: User) {
		this.id = id;
		this.name = name;
		this.houseOwner = houseOwner;
		this.chores = [];
		this.users = [];
	}

	public get getId(): Number {
		return this.id;
	}

	public get getName(): string {
		return this.name;
	}

	public get getHouseOwner(): User {
		return this.houseOwner;
	}

	public get getChores(): Chore[] {
		return this.chores;
	}

	public get getUsers(): HouseUser[] {
		return this.users;
	}
}
