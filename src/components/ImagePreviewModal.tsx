import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{
    original: string;
    thumbnail: string;
    description?: string;
  }>;
  initialIndex?: number;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999999] flex items-center justify-center">
      {/* Blur Background */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full h-full max-w-7xl max-h-[90vh] mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Gallery */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-5xl">
            <ImageGallery
              items={images}
              startIndex={currentIndex}
              showThumbnails={true}
              showFullscreenButton={true}
              showPlayButton={false}
              showBullets={false}
              showNav={true}
              autoPlay={false}
              slideInterval={3000}
              slideDuration={450}
              swipingTransitionDuration={450}
              onSlide={(index) => setCurrentIndex(index)}
              renderLeftNav={(onClick, disabled) => (
                <button
                  onClick={onClick}
                  disabled={disabled}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors ${
                    disabled ? 'opacity-50' : ''
                  }`}
                  aria-label="Previous image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              renderRightNav={(onClick, disabled) => (
                <button
                  onClick={onClick}
                  disabled={disabled}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors ${
                    disabled ? 'opacity-50' : ''
                  }`}
                  aria-label="Next image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
              renderFullscreenButton={(onClick, isFullscreen) => (
                <button
                  onClick={onClick}
                  className="absolute bottom-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 3.5h17v17h-17z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 8.5h7v7h-7z" />
                    </svg>
                  )}
                </button>
              )}
            />
          </div>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 z-20 bg-black/50 text-white px-3 py-2 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};
