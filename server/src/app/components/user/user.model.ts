import { Chore } from "../chore/chore.model";
import { House } from "../house/house.model";
import { HouseUser } from "../houseuser/houseuser.model";

export class User {
    private _id: string;
    private _name: string;
    private _housesOwned: House[];
    private _chores: Chore[];
    private _houses: HouseUser[];

	constructor(
		id: string,
		name: string
	) {
        this._id = id;
        this._name = name;
        this._housesOwned = [];
        this._chores = [];
        this._houses = [];
    };

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get housesOwned(): House[] {
        return this._housesOwned;
    }

    public get chores(): Chore[] {
        return this._chores;
    }

    public get houses(): HouseUser[] {
        return this._houses;
    }
}
