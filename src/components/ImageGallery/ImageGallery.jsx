import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

export const ImageGallery = ({images, onImageClick}) => {
  return (
      <ul className={styles.gallery}>
          {images.map((image) => (
            <ImageGalleryItem 
              key={image.id}
              image={image}
              className={styles.galleryItem}
              onImageClick={onImageClick} 
            /> 
          ))}
      </ul>
    );
  };

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string,
      })
    ).isRequired,
    onImageClick: PropTypes.func.isRequired,
  };
