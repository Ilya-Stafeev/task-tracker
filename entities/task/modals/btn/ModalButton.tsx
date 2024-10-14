import { FC } from 'react'
import { IModalButton } from './types/ModalButton.interface'

const ModalButton: FC<IModalButton> = ({ title, onClick }) => {
  return (
    <button onClick={onClick}>{title}</button>
  )
}

export default ModalButton