import React from 'react'
import styles from './Input.module.scss'

const Input = ({ children }) => {
    return (
    <div className={styles.inputDisplay}>{children ? children : 0}</div>
    )
}

export default Input
