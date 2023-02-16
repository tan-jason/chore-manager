import { User } from "../user/user.model";
import { House } from "../house/house.model";

export interface HouseUser {
    id: Number,
    userId: string,
    user: User,
    houseId: Number,
    house: House,
};