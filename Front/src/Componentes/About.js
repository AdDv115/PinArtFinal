import '../css/About.css';

const About = ({ showAboutModal, setShowAboutModal }) => {
  return (
    <div className={`about ${showAboutModal ? "abierto" : ""}`}>
      <button className="cerrar" onClick={() => setShowAboutModal(false)}>X</button>
      
      <div className="about-content">
        <h1>Inspírate</h1> 
        
        <p>Luego, da los primeros pasos.</p>
        <p>Acerca de PinArt</p>

        <p>PinArt es una plataforma de búsqueda y 
          descubrimiento visual donde las personas encuentran inspiración, 
          seleccionan ideas y compran productos, 
          todo en un lugar positivo en línea. 
          PinArt, con sede en San Francisco, se lanzó en 2010 y 
          tiene más de 500 millones de usuarios mensuales activos en todo el mundo.</p>

        <button className='btn-about' onClick={() =>setShowAboutModal(false)}>Visitar PinArt</button>
      </div>
    </div>
  );
}

export default About;