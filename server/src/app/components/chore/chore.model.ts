export class Chore {
	private id: Number;
	private title: string;
	private userId: string;
	private houseId: Number;
	private completionTime?: Date;

	constructor(
		id: Number,
		title: string,
		userId: string,
		houseId: Number,
		completionTime?: Date
	) {
		this.id = id;
		this.title = title;
		this.userId = userId;
		this.houseId = houseId;
		this.completionTime = completionTime;
	}

	public get getId(): Number {
		return this.id;
	}

	public get getTitle(): string {
		return this.title;
	}

	public get getUserId(): string {
		return this.userId;
	}

	public get getHouseId(): Number {
		return this.houseId;
	}

	public get getCompletionTime(): Date | undefined {
		return this.completionTime;
	}
}
