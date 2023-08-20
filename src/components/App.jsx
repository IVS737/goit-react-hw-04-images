import { getImages } from 'api/image';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useState, useEffect } from 'react';
import { LoadMoreBtn } from './Button/Button';
import { RotatingLines } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';

import styles from './App.module.css';

export const App = () => {
  const LIMIT = 12;

  const [showModalBull, setShowModalBull] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!query || !page) {
      return;
    }
    async function loadMoreImages() {
      const skip = page * LIMIT - LIMIT;

      try {
        setIsLoading(true);

        const data = await getImages(query, page, LIMIT, skip);

        setImages(prevImages => (page === 1 ? data : [...prevImages, ...data]));
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
    loadMoreImages();
  }, [page, query]);

  const handleSearch = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const showModal = id => {
    setShowModalBull(true);
    setActiveItem(id);
  };

  const hideModal = () => {
    setShowModalBull(false);
    setActiveItem(null);
  };

  const getActiveImage = id => {
    const imageData = images.find(item => item.id === id);

    if (!imageData) return null;

    return <img src={imageData.largeImageURL} alt={imageData.alt} />;
  };

  return (
    <div className={styles.App}>
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery onClick={showModal} imgArr={images} />

      {images.length >= LIMIT ? (
        <LoadMoreBtn loadMore={handleLoadMore} />
      ) : null}

      {isLoading ? (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
          className={styles.Loader}
        />
      ) : (
        error
      )}

      <Modal
        show={showModalBull && typeof activeItem === 'number'}
        onHide={hideModal}
        getActiveImage={getActiveImage(activeItem)}
      ></Modal>
    </div>
  );
};
