import { ImageLi } from './components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import styles from './ImageGallery.module.css';

export const ImageGallery = ({ onClick, imgArr }) => (
  <ul className={styles.ImageGallery}>
    {imgArr.map(item => (
      <ImageLi
        onClick={() => onClick(item.id)}
        key={item.id}
        img={item.previewURL}
        alt={item.tags}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
