import React, { Component } from 'react';
import MySpinner from './Spinner/Spinner';
import Modal from './Modal/Modal';
import SearchForm from './SearchForm/SearchForm';
import Button from './Button/Button';
import Gallery from './Gallery/Gallery';
import Text from './Error/Text';
import styles from './App.module.css';
import * as API from '../services/images-api';

const myScrollTo = (step, to) => {
  let i = step;
  // eslint-disable-next-line func-names
  const interval = setInterval(function() {
    window.scrollTo(0, i);
    i += step;

    if (i >= to) clearInterval(interval);
  }, 20);
  window.scrollTo(0, to);
};

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    notFound: false,
    page: 2,
    isModal: false,
    fullviewimg: '',
    value: '',
  };

  componentDidMount() {
    this.handleFetchedImages();
  }

  handleFetchedImages = (value = 'cat', page = '1') => {
    this.setState({ isLoading: true, value });
    API.fetchedImages(value, page)
      .then(res => {
        if (res.hits.length === 0) {
          return this.setState({ images: [], notFound: true });
        }
        return this.setState({
          images: res.hits,
          notFound: false,
          error: null,
          page: 2,
        });
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleLoadMore = () => {
    this.setState({ isLoading: true });
    const { value, page } = this.state;

    API.fetchedImages(value, page)
      .then(res => {
        this.setState(state => ({
          images: [...state.images, ...res.hits],
          page: state.page + 1,
          error: null,
        }));
        myScrollTo(50, 1450);
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleCloseModal = () => this.setState({ isModal: false });

  handleOpenModal = fullviewimg =>
    this.setState({ isModal: true, fullviewimg });

  hanleLoader = () => {
    this.setState({ isLoading: true });
  };

  render() {
    const {
      images,
      isLoading,
      error,
      notFound,
      isModal,
      fullviewimg,
    } = this.state;
    return (
      <div className={styles.app}>
        <SearchForm onSubmit={this.handleFetchedImages} />
        {images.length > 0 && (
          <>
            <Gallery items={images} onClick={this.handleOpenModal} />
            <Button onClick={this.handleLoadMore} />
          </>
        )}
        {isLoading && <MySpinner />}
        {notFound && <Text>Sorry , Not Found images!!! </Text>}
        {error && <Text>Whoops, something went wrong: {error.message} </Text>}
        {isModal && (
          <Modal onClose={this.handleCloseModal} imgUrl={fullviewimg} />
        )}
      </div>
    );
  }
}
