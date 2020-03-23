export interface IContact {
    _id?: string ,
    name: string,
    email: string,
    phone: number | string,
    city: string
}

export interface IContactsComponent {
    error: boolean,
    contacts: IContact[] | null
}

export interface IContactsList {
    contact: IContact | null
}
