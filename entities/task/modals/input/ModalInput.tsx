import { ChangeEvent, FC } from "react"
import styles from './ModalInput.module.scss'

interface IInput {
    value: string
    onChange: (value: string) => void
}

const ModalInput: FC<IInput> = ({value, onChange}) => {
    const handaleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

  return (
    <input 
        type="text"
        value={value}
        onChange={handaleInputChange}
        className={styles.input} 
    />
  )
}

export default ModalInput