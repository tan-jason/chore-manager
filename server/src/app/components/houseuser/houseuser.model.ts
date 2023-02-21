import { User } from "../user/user.model";
import { House } from "../house/house.model";

export class HouseUser {
    private _id: Number;
    private _user: User;
    private _house: House;

	constructor(
		id: Number,
		user: User,
        house: House
	) {
        this._id = id;
        this._user = user;
        this._house = house;
    };

    public get id(): Number {
        return this._id;
    }

    public get user(): User {
        return this._user;
    }

    public get house(): House {
        return this._house;
    }
}
