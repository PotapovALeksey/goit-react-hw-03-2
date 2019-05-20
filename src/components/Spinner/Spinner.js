import React from 'react';
import Spinner from 'react-spinkit';
import styles from './Spinner.module.css';

const MySpinner = () => (
  <Spinner
    className={styles.spinner}
    name="ball-spin-fade-loader"
    color="blue"
    fadeIn="none"
  />
);

export default MySpinner;
