function Contact() {
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
            <form className="d-flex flex-column justify-content-center">
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">
                  Email address
                </label>
                <input type="email" className="form-control" id="email" placeholder="email@email.co.uk" required />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label text-white">
                  Phone (optional)
                </label>
                <input type="tel" className="form-control" id="phone" placeholder="+44*********" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label text-white">
                  Describe the job
                </label>
                <textarea className="form-control" id="message" rows="3" placeholder="Home repair, painting, gardening, etc..." required></textarea>
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
