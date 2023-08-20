import styles from './Button.module.css';
import PropTypes from 'prop-types';

export const LoadMoreBtn = ({ loadMore }) => (
  <button type="button" onClick={loadMore} className={styles.Button}>
    Load more
  </button>
);

LoadMoreBtn.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
