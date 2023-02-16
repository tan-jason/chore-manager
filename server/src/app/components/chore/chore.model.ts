import { House } from "../house/house.model";
import { User } from "../user/user.model";

export interface Chore {
	id: Number,
	title: string,
	assignee?: User,
	asigneeId?: string,
	house?: House,
	houseId?: Number,
}
