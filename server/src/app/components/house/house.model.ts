import { Chore } from "../chore/chore.model";
import { User } from "../user/user.model";
import { HouseUser } from "../houseuser/houseuser.model";

export class House {
    private _id: Number;
    private _name: string;
    private _houseOwner: User;
    private _chores: Chore[];
    private _users: HouseUser[];

	constructor(
		id: Number,
		name: string,
		houseOwner: User
	) {
        this._id = id;
        this._name = name;
        this._houseOwner = houseOwner;
        this._chores = [];
        this._users = [];
    };

    public get id(): Number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get houseOwner(): User {
        return this._houseOwner;
    }

    public get chores(): Chore[] {
        return this._chores;
    }

    public get users(): HouseUser[] {
        return this._users;
    }
}
