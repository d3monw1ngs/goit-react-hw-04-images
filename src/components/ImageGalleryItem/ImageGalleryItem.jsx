import React, { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({image, onImageClick}) => {
  const { webformatURL, tags, largeImageURL } = image;
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    onImageClick(largeImageURL);
    toggleModal();
  };

  const toggleModal = () => {
   setShowModal(prevShowModal => !prevShowModal);
  };
  
return (
  <li className={styles.galleryItem} onClick={handleClick}>
    <img 
      src={webformatURL} 
      alt={tags}
    />
      {showModal && <Modal image={largeImageURL} tags={tags} 
      onClose={toggleModal} />}
  </li>
  );
};


ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};