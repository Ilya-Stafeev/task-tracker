import { FC } from 'react'
import styles from './Navigation.module.scss'

import Logo from './logo/Logo'
import Menu from './menu/Menu'

import { MenuData } from './menu/data/Menu.data'


const Navigation: FC = () => {
  return (
    <div className={styles.navigation}>      
      <Logo/>
      <Menu menu={MenuData}/>
    </div>
  )
}

export default Navigation