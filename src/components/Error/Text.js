import React from 'react';
import PropTypes from 'prop-types';
import styles from './Text.module.css';

const Text = props => {
  const { children } = props;
  return <p className={styles.text}>{children}</p>;
};

Text.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Text;
