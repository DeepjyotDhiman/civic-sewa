import React from 'react';

const ServicesPageStyles = () => (
  <style>{`
    .page-container { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
    .page-header { text-align: center; margin-bottom: 3rem; }
    .page-title { font-size: 2.8rem; color: #0d6efd; }
    .page-subtitle { font-size: 1.2rem; color: #6c757d; max-width: 700px; margin: 0.5rem auto 0; }
    .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
    .service-card { background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 2rem; text-align: center; transition: all 0.3s ease; }
    .service-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
    .service-icon { font-size: 3rem; margin-bottom: 1rem; color: #0d6efd; }
    .service-card h3 { font-size: 1.5rem; margin-bottom: 0.5rem; color: #212529; }
    .service-card p { color: #6c757d; line-height: 1.6; }
  `}</style>
);

const ServiceCard = ({ icon, title, description }) => (
  <div className="service-card">
    <div className="service-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const ServicesPage = () => {
  return (
    <div className="page-container">
      <ServicesPageStyles />
      <div className="page-header">
        <h1 className="page-title">Our Services</h1>
        <p className="page-subtitle">We handle a wide range of non-emergency civic issues to improve our public infrastructure and environment.</p>
      </div>
      <div className="services-grid">
        <ServiceCard icon="🛣️" title="Streets & Roads" description="Report potholes, damaged footpaths, faded road markings, and other street-related issues." />
        <ServiceCard icon="🗑️" title="Garbage & Waste" description="Report overflowing bins, illegal dumping, or request waste collection services in your area." />
        <ServiceCard icon="💡" title="Electricity" description="Report broken or malfunctioning streetlights, exposed wiring, and other public electrical hazards." />
        <ServiceCard icon="💧" title="Sewage & Water" description="Report blocked drains, sewage leaks, or issues with public water supply and drainage." />
        <ServiceCard icon="🌳" title="Forest & Parks" description="Report fallen trees, overgrown parks, or damage to public green spaces." />
        <ServiceCard icon="🚨" title="Emergency Issues" description="A dedicated channel for high-priority disasters like floods, cyclones, and landslides." />
      </div>
    </div>
  );
};

export default ServicesPage;