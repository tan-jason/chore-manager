import { User } from "../user/user.model";
import { House } from "../house/house.model";

export class HouseUser {
	private id: Number;
	private user: User;
	private house: House;

	constructor(id: Number, user: User, house: House) {
		this.id = id;
		this.user = user;
		this.house = house;
	}

	public get getId(): Number {
		return this.id;
	}

	public get getUser(): User {
		return this.user;
	}

	public get getHouse(): House {
		return this.house;
	}
}
