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

function Gallery() {
  // State to store gallery items
  const [galleryItems, setGalleryItems] = useState([]);

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
        const response = await client.getEntries(); // Fetch all entries

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

        // Update gallery items state
        setGalleryItems(items);
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      }
    }

    fetchGalleryItems();
  }, []);

  return (
    <section id="gallery">
      <div className="container d-flex flex-column align-items-center min-vh-100">
        <h1 className="text-white fw-bold my-5 py-5">PROJECT GALLERY</h1>

        {/* If gallery items aren't returned, show loading icon. If they are returned, display them in an image carousel */}
        {galleryItems.length === 0 ? (
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
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
                  {/* <img src={`https:${item.imageUrl}`} className="d-block w-100 img-fluid" alt="..." /> */}
                  <div className="carousel-caption">
                    <h5 className="d-none d-md-block">{item.title}</h5>
                    <h5 className="d-block d-md-none fs-6">{item.title}</h5>
                    <p className="d-md-block">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button class="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}

export default Gallery;
