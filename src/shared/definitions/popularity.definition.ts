export enum Popularity {
	high = 'alto',
	medium = 'medio',
	low = 'bajo'
}

export const popularities = Object.keys(Popularity).map(key => ({ value: Popularity[key], key }));
