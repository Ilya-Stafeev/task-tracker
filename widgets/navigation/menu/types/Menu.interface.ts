import { IMenuItem } from "../menu-item/types/MenuItem.interface"

export interface IMenu {
    title?: string
    items: IMenuItem[]
}