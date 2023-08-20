import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export const Modal = ({ onHide, show, getActiveImage }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') onHide();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onHide]);

  const handleBackdropClick = e => {
    console.log('Click on Backdrop');
    if (e.target === e.currentTarget) {
      onHide();
    }
  };

  if (!show) return null;

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>{getActiveImage}</div>
    </div>,
    document.querySelector('#root')
  );
};
