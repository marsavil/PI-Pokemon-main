import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/LandingPage.module.css';
import image from '../images/Pokemon-gif.gif';

export default function LandingPage(){
    return (
        <div>
            <div>
                <h1 className={styles.tittle}>Welcome!</h1>
            </div>
            
            <Link to = '/home'>
                <button className={styles.btn}>ENTER</button>
                <div className={styles.img_container}>
                    <img className={styles.img} src={image} alt="" />
                </div>
            </Link>
        </div>
    )
}