import React from 'react';
import styles from './Text.module.css';

const Text = () => <p className={styles.text}>this.props.children</p>;

export default Text;
