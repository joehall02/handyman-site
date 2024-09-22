function Home() {
  return (
    <section id="home" className="position-relative">
      {/* Dark overlay, zIndex used to position homepage content above the overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style={{ zIndex: 1 }}></div>

      <div className="container d-flex flex-column align-items-center justify-content-center vh-100" style={{ zIndex: 2, position: "relative" }}>
        <h1 className="text-center text-white fw-bold pb-3">
          FIX IT FAST <br />
          WITH REPAIRS THAT LAST
        </h1>
        <h3 className="text-center text-white pb-3">
          We hit the nail on the head when <br />
          it comes to quality service
        </h3>
        <a className="btn px-4 boxy-button" href="#services">
          LEARN MORE
        </a>
      </div>
    </section>
  );
}
export default Home;
