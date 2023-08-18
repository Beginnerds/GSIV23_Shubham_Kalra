import React from 'react'
import styles from "./MovieCard.module.css"

export default function MovieCard() {
  return (
    <div className={styles.container}>
        <div className={styles.imageContainer}>
            <image className={styles.image}/>
        </div>

        <div className={styles.dataContainer}>
            <div className={styles.titleRatingContainer}>
                <h3 className={styles.title}>Movie Title</h3>
                <span className={styles.rating}>(Rating)</span>
            </div>

            <div className={styles.descriptionContainer}>
                <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>
    </div>
  )
}
