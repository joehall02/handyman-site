function Home() {
  return (
    <section id="home" className="position-relative">
      {/* Dark overlay, zIndex used to position homepage content above the overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style={{ zIndex: 1 }}></div>

      <div className="container" style={{ zIndex: 2, position: "relative" }}>
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
          <h1 className="text-center text-white fw-bold pb-3">
            FIX IT FAST <br />
            WITH REPAIRS THAT LAST
          </h1>
          <h3 className="text-center text-white pb-3">
            We hit the nail on the head when <br />
            it comes to quality service
          </h3>
          <button className="btn custom-button">LEARN MORE</button>
        </div>
      </div>
    </section>
  );
}
export default Home;
