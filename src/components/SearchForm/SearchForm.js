import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchForm.module.css';

export default class SearchForm extends Component {
  state = { value: '' };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { value } = this.state;
    const { onSubmit } = this.props;

    onSubmit(value);

    this.reset();
  };

  reset = () => this.setState({ value: '' });

  render() {
    const { value } = this.state;
    return (
      <form className={styles.searchForm} onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          className={styles.searchInput}
          type="text"
          autoComplete="off"
          placeholder="Search images..."
          value={value}
        />
      </form>
    );
  }
}
