import { FC } from 'react'

import styles from './Menu.module.scss'

import { IMenu } from './types/Menu.interface'
import MenuItem from './menu-item/MenuItem'

const Menu: FC<{menu: IMenu}> = ({ menu: {title, items} }) => {
  return (
    <div className={styles.menu}>
        <h3>{title}</h3>
        {items.map(item => (
            <MenuItem item={item} key={item.title}/>
        ))}
    </div>
  )
}

export default Menu