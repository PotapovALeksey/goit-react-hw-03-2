import React, { Component } from 'react';
import MySpinner from './Spinner/Spinner';
import Modal from './Modal/Modal';
import SearchForm from './SearchForm/SearchForm';
import Button from './Button/Button';
import Gallery from './Gallery/Gallery';
import Text from './Error/Text';
import styles from './App.module.css';
import * as API from '../services/images-api';

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
        setInterval(() => {
          window.scrollTo(0, 1000);
        }, 500);
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleCloseModal = () => this.setState({ isModal: false });

  handleOpenModal = fullviewimg =>
    this.setState({ isModal: true, fullviewimg });

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
