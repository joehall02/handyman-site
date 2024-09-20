function Services() {
  return (
    <section id="services">
      <div className="container d-flex flex-wrap align-items-center justify-content-center min-vh-100 py-5">
        <div className="row w-100">
          <div className="col-md-4 d-flex align-items-center">
            <div className="row">
              <div className="col-6 d-flex justify-content-center my-3">
                <i className="bi bi-tools text-white custom-icon"></i>
              </div>
              <div className="col-6 d-flex justify-content-center my-3">
                <i className="bi bi-lightbulb text-white custom-icon"></i>
              </div>
              <div className="col-6 d-flex justify-content-center my-3">
                <i className="bi bi-paint-bucket text-white custom-icon"></i>
              </div>
              <div className="col-6 d-flex justify-content-center my-3">
                <i className="bi bi-screwdriver text-white custom-icon"></i>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <h1 className="text-white fw-bold">SERVICES</h1>
            <p className="text-white custom-line-height">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore saepe eligendi sunt rem. Tenetur similique ut suscipit autem, praesentium minus dolore iste veniam, impedit ipsum,
              velit explicabo sapiente quam esse. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, beatae. Perferendis est magnam, neque incidunt ex esse nulla nesciunt cupiditate
              reprehenderit quos hic inventore soluta sunt ipsam a eligendi mollitia? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore veritatis, saepe dignissimos esse enim
              perspiciatis consequuntur nihil? Esse officiis, neque asperiores illo quam facere iste nam, temporibus aliquid nostrum blanditiis.
            </p>

            <div className="row mt-3">
              <div className="col-md-6">
                <p className="text-white fw-bold">Home Repair</p>
                <p className="text-white fw-bold">Plaster & Drywall</p>
                <p className="text-white fw-bold">Child Proofing</p>
                <p className="text-white fw-bold">Plumbing</p>
              </div>
              <div className="col-md-6">
                <p className="text-white fw-bold">Home Repair</p>
                <p className="text-white fw-bold">Plaster & Drywall</p>
                <p className="text-white fw-bold">Child Proofing</p>
                <p className="text-white fw-bold">Plumbing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
