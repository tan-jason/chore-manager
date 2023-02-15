import { Chore } from './Chore'
import { House } from './House';

export class User {
    private name: string;
    private chores: Chore[];
    private houses: House[];
    private housesManaged: House[];

    constructor(name: string, chores: Chore[], houses: House[], housesManaged: House[]) {
        this.name = name;
        this.chores = chores;
        this.houses = houses;
        this.housesManaged = housesManaged;
    }
}