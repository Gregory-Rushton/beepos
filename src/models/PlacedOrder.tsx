export interface PlacedOrder {
    address: string,
    date: number,
    email: string,
    isComplete: boolean,
    name: string,
    phoneNumber: string,
    purchases: Object,
    tax: string,
	paid: boolean
}