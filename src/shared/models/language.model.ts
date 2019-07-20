import { Popularity } from '../definitions';

export class Language {
	id: number;
	name: string;
	creationDate: Date;
	popularity: Popularity;

	constructor(id: number, name: string, creationDate: Date, popularity: Popularity) {
		this.id = id;
		this.name = name;
		this.creationDate = creationDate;
		this.popularity = popularity;
	}
}
