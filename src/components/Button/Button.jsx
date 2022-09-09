import React from 'react'
import styles from './Button.module.css'

function Button(props) {
  return (
    <button 
    onClick={props.endGame ? props.newGame : props.roll} 
    className={styles.button}>
       {props.endGame ? 'New Game' : 'Roll'}
       </button>
  )
}

export default Button