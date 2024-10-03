import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Message failed to send.");
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section id="contact">
      <div className="d-flex flex-column-reverse flex-lg-row">
        {/* Contact info */}
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center vh-100 contact-info">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center mb-5 ms-5">
              <i className="bi bi-telephone text-white me-5 fs-1"></i>
              <h2 className="fw-bold text-white">07984712934</h2>
            </div>
            <div className="d-flex align-items-center mb-5 ms-5">
              <i className="bi bi-envelope text-white me-5 fs-1"></i>
              <h2 className="fw-bold text-white">handyman@gmail.co.uk</h2>
            </div>
            <div className="d-flex align-items-center mb-5 ms-5">
              <i className="bi bi-instagram text-white me-5 fs-1"></i>
              <h2 className="fw-bold text-white">handyman123</h2>
            </div>
            <div className="d-flex align-items-center mb-5 ms-5">
              <i className="bi bi-facebook text-white me-5 fs-1"></i>
              <h2 className="fw-bold text-white">thehandyman123</h2>
            </div>
          </div>
        </div>
        {/* Contact form */}
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center vh-100 contact-form">
          <div className="col-10 col-lg-8">
            <h1 className="fw-bold text-white text-center pb-5">GET IN TOUCH</h1>
            <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-white">
                  Name
                </label>
                <input type="text" className="form-control" id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">
                  Email address
                </label>
                <input type="email" className="form-control" id="email" name="email" placeholder="email@email.co.uk" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label text-white">
                  Phone (optional)
                </label>
                <input type="tel" className="form-control" id="phone" name="phone" placeholder="+44*********" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label text-white">
                  Describe the job
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="3"
                  name="message"
                  placeholder="Home repair, painting, gardening, etc..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn mt-4 px-5 boxy-button w-auto mx-auto">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
