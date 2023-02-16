import { Chore } from '../chore/chore.model'
import { House } from '../house/house.model';
import { HouseUser } from '../houseuser/houseuser.model';

export interface User {
    name: string,
    id: string,
    housesOwned: House[],
    chores: Chore[],
    houses: HouseUser[],
};