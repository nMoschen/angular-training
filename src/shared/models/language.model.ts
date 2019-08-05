import { Popularity } from '../definitions';

export class Language {
	id?: number;
	name: string;
	creationDate?: Date;
	popularity?: Popularity;

	constructor(data: {
		name: string,
		id?: number,
		creationDate?: Date,
		popularity?: Popularity
	}) {
		this.id = data.id;
		this.name = data.name;

		if (data.creationDate) { this.creationDate = data.creationDate; }
		if (data.popularity) { this.popularity = data.popularity; }
	}
}
