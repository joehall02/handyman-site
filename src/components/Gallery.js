import React from "react";
import { useState, useEffect } from "react";

// LocalStorage keys for caching
const CACHE_KEY = "galleryItems";
const CACHE_EXPIRATION_KEY = "galleryItemsExpiration";

// Cache expiration time in milliseconds (1 hour)
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000;

function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]); // State to store gallery items
  const [isLoading, setIsLoading] = useState(true); // State to store loading status
  const [error, setError] = useState(null); // State to store error status

  useEffect(() => {
    // Fetch gallery items from backend
    async function fetchGalleryItems() {
      try {
        // Check if gallery items are cached and still valid
        const cachedGalleryItems = localStorage.getItem(CACHE_KEY);
        const expirationTime = localStorage.getItem(CACHE_EXPIRATION_KEY);

        if (cachedGalleryItems && expirationTime && Date.now() < expirationTime) {
          setGalleryItems(JSON.parse(cachedGalleryItems));
          setIsLoading(false);
          return;
        }

        // Fetch entries from backend
        const response = await fetch("/api/gallery");
        if (!response.ok) {
          throw new Error("Failed to fetch gallery items");
        }
        const items = await response.json();

        // Cache gallery items
        localStorage.setItem(CACHE_KEY, JSON.stringify(items));
        localStorage.setItem(CACHE_EXPIRATION_KEY, Date.now() + CACHE_EXPIRATION_TIME);

        // Update gallery items state
        setGalleryItems(items);

        setIsLoading(false); // Set loading status to false
      } catch (error) {
        setError("Unable to load gallery items at this time."); // Set error status
        setIsLoading(false); // Set loading status to false
      }
    }

    fetchGalleryItems();
  }, []);

  return (
    <section id="gallery">
      <div className="container d-flex flex-column align-items-center min-vh-100">
        <h1 className="text-white fw-bold my-5 py-5">PROJECT GALLERY</h1>

        {/* If gallery items aren't returned, show loading icon. If they are returned, display them in an image carousel */}
        {isLoading ? (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div id="imageCarousel" className="carousel slide col-12 col-lg-8 mb-5" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {/* Create a carousel indicator for each gallery item */}
              {galleryItems.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#imageCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {/* Create a carousel item for each gallery item */}
              {galleryItems.map((item, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <img src={`https:${item.imageUrl}`} className="d-block w-100 img-fluid" alt="..." />
                  <div className="carousel-caption">
                    <h5 className="d-none d-md-block">{item.title}</h5>
                    <h5 className="d-block d-md-none fs-6">{item.title}</h5>
                    <p className="d-md-block">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;
