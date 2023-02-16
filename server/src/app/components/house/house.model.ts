import { Chore } from "../chore/chore.model";
import { User } from "../user/user.model";
import { HouseUser } from "../houseuser/houseuser.model";

export interface House {
	id: Number,
	houseName: string,
	houseOwner?: User,
	ownerId?: string,
	chores: Chore[],
	users: HouseUser[],
}
