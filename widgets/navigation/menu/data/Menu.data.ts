import { IMenu } from "../types/Menu.interface";

export const MenuData: IMenu = {
    title: 'Меню',
    items: [
        {
            title: 'Главная',
            link: '/'
        },
        {
            title: 'Задачи',
            link: '/tasks'
        },
        {
            title: 'Команда',
            link: '/team'
        }
    ]
}