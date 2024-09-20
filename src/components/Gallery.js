import React from "react";
import gallery1 from "../assets/gallery_1.jpeg";
import gallery2 from "../assets/gallery_2.jpeg";
import gallery3 from "../assets/gallery_3.jpeg";

function Gallery() {
  return (
    <section id="gallery">
      <div className="container d-flex flex-column align-items-center min-vh-100">
        <h1 className="text-white fw-bold my-5 py-5">PROJECT GALLERY</h1>

        {/* <div className="row w-100 mb-5">
          <div className="col-lg-4">
            <img src={gallery1} alt="Home" className="img-fluid" />
          </div>
          <div className="col-lg-4">
            <img src={gallery2} alt="Home" className="img-fluid" />
          </div>
          <div className="col-lg-4">
            <img src={gallery3} alt="Home" className="img-fluid" />
          </div>
        </div> */}

        <div id="imageCarousel" class="carousel slide col-12 col-md-8 mb-5" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={gallery1} class="d-block w-100 img-fluid" alt="..." />
              <div class="carousel-caption">
                <h5 class="d-none d-md-block">First slide label</h5>
                <h5 class="d-block d-md-none fs-6">First slide label</h5>
                <p class="d-md-block">Some representative placeholder content for the first slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={gallery2} class="d-block w-100 img-fluid" alt="..." />
              <div class="carousel-caption">
                <h5 class="d-none d-md-block">First slide label</h5>
                <h5 class="d-block d-md-none fs-6">First slide label</h5>
                <p class="d-md-block">Some representative placeholder content for the first slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={gallery3} class="d-block w-100 img-fluid" alt="..." />
              <div class="carousel-caption">
                <h5 class="d-none d-md-block">First slide label</h5>
                <h5 class="d-block d-md-none fs-6">First slide label</h5>
                <p class="d-md-block">Some representative placeholder content for the first slide.</p>
              </div>
            </div>
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
      </div>
    </section>
  );
}

export default Gallery;
