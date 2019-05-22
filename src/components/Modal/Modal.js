import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import ImageLoader from '../ImageLoader/ImageLoader';
import styles from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    imgUrl: PropTypes.string.isRequired,
  };

  backdropRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.code !== 'Escape') return;

    this.props.onClose();
  };

  handleBackDropClick = e => {
    const { current } = this.backdropRef;

    if (current && current !== e.target) return;

    this.props.onClose();
  };

  render() {
    const { imgUrl } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={styles.backDrop}
        ref={this.backdropRef}
        onClick={this.handleBackDropClick}
        onKeyPress={() => {}}
      >
        <div className={styles.content}>
          <ImageLoader src={imgUrl} />
        </div>
      </div>
    );
  }
}
