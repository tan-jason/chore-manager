import { User } from "../user/user.model";
import { House } from "../house/house.model";

export class Chore {
    private _id: Number;
    private _title: string;
    private _assignee: User;
    private _house: House;
	private _time?: Date;

	constructor(
		id: Number,
		title: string,
		assignee: User,
		house: House,
		time?: Date
	) {
        this._id = id;
        this._title = title;
        this._assignee = assignee;
        this._house = house;
        this._time = time;
    };

    public get id(): Number {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public get assignee(): User {
        return this._assignee;
    }

    public get house(): House {
        return this._house;
    }

	public get time(): Date| undefined {
		return this._time;
	}
}
