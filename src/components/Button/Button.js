import React from 'react';
import styles from './Button.module.scss'

const Button = ({ children, onClick, isClear }) => {
    return (
        <button onClick={onClick} className={`${styles.btnNumber} ${isClear ? styles.clearBtnWidth : styles.normalWidth}`}>{children}</button>
    )
}

export default Button
