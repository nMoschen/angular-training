import { Popularity } from '../definitions';

export class Language {
	id: number;
	name: string;
	creationDate?: Date;
	popularity?: Popularity;

	constructor(id: number, name: string, creationDate?: Date, popularity?: Popularity) {
		this.id = id;
		this.name = name;

		if (creationDate) { this.creationDate = creationDate; }
		if (popularity) { this.popularity = popularity; }
	}
}
