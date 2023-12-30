import React from 'react'
import styles from './loader.module.css'

const Loader = ({ color, width }) => {
    return (
        <div className={styles.loader} style={{ "--loaderColor": color, "--width": width }}></div>
    )
}

Loader.defaultProps = {
    color: "#a855f7",
    width: "60px"
}

export default Loader