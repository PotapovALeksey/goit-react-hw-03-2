import React from 'react';
import PropTypes from 'prop-types';
import styles from './GalleryItem.module.css';

const GalleryItem = ({
  largeImageURL,
  webformatURL,
  likes,
  views,
  comments,
  downloads,
  tags,
  onClick,
}) => (
  <li className={styles.galleryItem} data-fullviewimg={largeImageURL}>
    <img className={styles.itemImg} src={webformatURL} alt={tags} />

    <div className={styles.stats}>
      <p className={styles.statsItem}>
        <i className="material-icons">thumb_up</i>
        {likes}
      </p>
      <p className={styles.statsItem}>
        <i className="material-icons">visibility</i>
        {views}
      </p>
      <p className={styles.statsItem}>
        <i className="material-icons">comment</i>
        {comments}
      </p>
      <p className={styles.statsItem}>
        <i className="material-icons">cloud_download</i>
        {downloads}
      </p>
    </div>

    <button
      onClick={() => onClick(largeImageURL)}
      type="button"
      className={styles.fullscreenButton}
    >
      <i className={(styles.buttonIcon, 'material-icons')}>zoom_out_map</i>
    </button>
  </li>
);

GalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  views: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  downloads: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GalleryItem;
