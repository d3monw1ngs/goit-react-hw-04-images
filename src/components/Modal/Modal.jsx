import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    tags: PropTypes.string,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if(e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { image, tags } = this.props;

    return (
      <div className={styles.overlay} onClick={this.handleOverlayClick}>
          <div className={styles.modal}>
              <img src={image} alt={tags} className={styles.modalImage} />
          </div>
      </div>
    );
  }
};