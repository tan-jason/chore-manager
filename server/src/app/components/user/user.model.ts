import { Chore } from "../chore/chore.model";
import { House } from "../house/house.model";
import { HouseUser } from "../houseuser/houseuser.model";

export class User {
	private id: string;
	private name: string;
	private housesOwned: House[];
	private chores: Chore[];
	private houses: HouseUser[];

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
		this.housesOwned = [];
		this.chores = [];
		this.houses = [];
	}

	public get getId(): string {
		return this.id;
	}

	public get getName(): string {
		return this.name;
	}

	public get getHousesOwned(): House[] {
		return this.housesOwned;
	}

	public get getChores(): Chore[] {
		return this.chores;
	}

	public get getHouses(): HouseUser[] {
		return this.houses;
	}
}
