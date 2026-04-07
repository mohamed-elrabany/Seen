import { useState } from "react";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";

export default function PostImages({ images }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const displayImages = images.slice(0, 3);
  const remainingCount = images.length - 3;

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prev = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  };

  const next = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i + 1) % images.length);
  };

  return (
    <>
      {/* Image Grid */}
      <div
        className={`grid gap-2 w-full ${
          displayImages.length === 1
            ? "grid-cols-1 h-72"
            : displayImages.length === 2
            ? "grid-cols-2 h-64"
            : "grid-cols-2 h-[22rem]"
        }`}
      >
        {displayImages.map((image, index) => {
          const isFirstOfThree = displayImages.length === 3 && index === 0;
          const isLastDisplayed = index === 2 && remainingCount > 0;

          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl cursor-pointer
                ${isFirstOfThree ? "row-span-2" : ""}
              `}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image}
                alt={`post image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />

              {/* Dark overlay with counter on last image */}
              {isLastDisplayed && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl">
                  <span className="text-white text-2xl font-bold">
                    +{remainingCount}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            onClick={closeLightbox}
          >
            <IoClose className="w-6 h-6" />
          </button>

          {/* Counter */}
          <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
            {activeIndex + 1} / {images.length}
          </p>

          {/* Left Arrow */}
          {images.length > 1 && (
            <button
              className="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
              onClick={prev}
            >
              <IoChevronBack className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <img
            src={images[activeIndex]}
            alt={`image ${activeIndex + 1}`}
            className="w-full h-full max-h-[80vh] max-w-[80vw] object-cover rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Right Arrow */}
          {images.length > 1 && (
            <button
              className="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
              onClick={next}
            >
              <IoChevronForward className="w-6 h-6" />
            </button>
          )}

          {/* Dot indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === activeIndex ? "bg-white w-4" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}