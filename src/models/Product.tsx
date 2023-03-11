export interface Product {
    id: string,
    name: string,
    description: string,
    location: string,
    imageURL: string,
    stock: number,
	position: number,
    relations: JSON
}
