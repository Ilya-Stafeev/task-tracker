import { FC } from 'react'
import Link from 'next/link'

import styles from './MenuItem.module.scss'

import { IMenuItem } from './types/MenuItem.interface'

const MenuItem: FC<{item: IMenuItem}> = ({ item }) => {
  return (
    <li className={styles.item}>
        <Link href={item.link}>
            {item.title}
        </Link>
    </li>    
  )
}

export default MenuItem