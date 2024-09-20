import React from "react";
import aboutBackground from "../assets/about_background.JPG";

function About() {
  return (
    <section id="about">
      <div className="d-flex vh-100">
        <div className="col-md-6 d-flex align-items-stretch d-none d-lg-block position-relative">
          {/* Dark overlay, zIndex used to position homepage content above the overlay */}
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
          <img src={aboutBackground} alt="About" className="img-fluid w-100 h-100" />
        </div>
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center about-description">
          <div className="col-10">
            <h1 className="fw-bold text-white pb-5">ABOUT US</h1>
            <p className="text-white custom-line-height">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ea, laudantium tempora beatae veniam cupiditate accusantium iusto eveniet impedit provident voluptatum corrupti modi ad eos
              vitae amet optio minima eligendi! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero rerum consequuntur excepturi ea ex facere ad magnam minus officiis odio provident, vel
              voluptas eius ipsa doloremque dolores incidunt! Repudiandae, sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit rerum eveniet libero, quod mollitia nobis
              voluptas incidunt repudiandae nulla veritatis exercitationem dolorem cum, cumque ex dignissimos quas velit, repellat laboriosam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
