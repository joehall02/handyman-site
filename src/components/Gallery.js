import React from "react";
import { useState, useEffect } from "react";
import { createClient } from "contentful";

// Class to represent a gallery item
class GalleryItem {
  constructor(title, description, imageUrl) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}

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
    // Create a new Contentful client
    const client = createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      environment: process.env.REACT_APP_CONTENTFUL_ENVIRONMENT_ID,
      accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
      host: "cdn.contentful.com", // Use the CDN to only retrieve published content
    });

    // Fetch gallery items from Contentful
    async function fetchGalleryItems() {
      try {
        // Check if gallery items are cached and still valid
        const cachedGalleryItems = localStorage.getItem(CACHE_KEY);
        const expirationTime = localStorage.getItem(CACHE_EXPIRATION_KEY);

        if (cachedGalleryItems && expirationTime && Date.now() < expirationTime) {
          console.log("Using cached gallery items");
          setGalleryItems(JSON.parse(cachedGalleryItems));
          setIsLoading(false);
          return;
        }

        // Fetch all entries
        console.log("Fetching gallery items from Contentful");
        const response = await client.getEntries();

        // Check if the response has the necessary data
        if (response && response.items) {
          // Create a map of asset IDs to URLs
          const assetMap = response.includes.Asset.reduce((acc, asset) => {
            acc[asset.sys.id] = asset.fields.file.url;
            return acc;
          }, {});

          // Map response items to GalleryItem objects
          const items = response.items.map((item) => {
            const { title, description, image } = item.fields;
            const imageUrl = assetMap[image.sys.id];
            return new GalleryItem(title, description, imageUrl);
          });

          // Cache gallery items
          localStorage.setItem(CACHE_KEY, JSON.stringify(items));
          localStorage.setItem(CACHE_EXPIRATION_KEY, Date.now() + CACHE_EXPIRATION_TIME);

          // Update gallery items state
          setGalleryItems(items);
        } else {
          throw new Error("No data found"); // Handle case where no data is returned
        }
        setIsLoading(false); // Set loading status to false
      } catch (error) {
        console.error("Error fetching gallery items:", error);
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
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : error ? (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div id="imageCarousel" class="carousel slide col-12 col-md-8 mb-5" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {/* Create a carousel indicator for each gallery item */}
              {galleryItems.map((item, index) => (
                <button
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
                <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <img src={`https:${item.imageUrl}`} className="d-block w-100 img-fluid" alt="..." />
                  <div className="carousel-caption">
                    <h5 className="d-none d-md-block">{item.title}</h5>
                    <h5 className="d-block d-md-none fs-6">{item.title}</h5>
                    <p className="d-md-block">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;
