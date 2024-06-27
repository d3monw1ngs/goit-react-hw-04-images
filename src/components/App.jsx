import React, { useState, useEffect, useCallback } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { getAPI } from '../pixabay-api';
import styles from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

export const App = () =>{
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const fetchImages = useCallback(async () => {    
    try {
      setIsLoading(true);  
      const response = await getAPI( query, currentPage );
      const { totalHits, hits } = response;
      console.log(response);
           
      // to display an error message when search does not match any item
      if(hits.length === 0) {
        toast.error('No images found. Try a different search.');
        return;
      } 

      // to display a success message on the first page
      if (currentPage === 1) {
        toast.success(`Great! We found ${totalHits} images!`);
      }

      // to display message if the end of page is reached
      if (currentPage * 12 >= totalHits) {
        setIsEnd(true);
        toast("We're sorry, but you've reached the end of search results.")
      }

      // update the data with new images
      setImages((prevImages) => [...prevImages, ...hits]);
    } catch {
      setIsError(true);
    } finally {
        setIsLoading(false);
      }
    }, [query, currentPage]);

    useEffect(() => {
      if (query) {
        fetchImages();
      }
    }, [query, currentPage, fetchImages]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setCurrentPage(1);
    setIsEnd(false);
    };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (url) => {
   setLargeImageURL(url);
   setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
      <div className={styles.app}>
        <Searchbar onSubmit={handleSearch} />
        <ImageGallery images={images} onImageClick={handleImageClick} />
        {images.length >= 1 && !isEnd && <Button onClick={handleLoadMore} />}
        {isLoading && <Loader />}
        {isError && toast.error('Error fetching images. Please try again.')}
        <Toaster position="top-right" reverseOrder={false} />
        {showModal && <Modal image={largeImageURL} onClose={handleCloseModal} />}        
      </div>
    );
  }; 
