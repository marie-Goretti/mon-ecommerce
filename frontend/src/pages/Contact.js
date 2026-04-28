import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    // Ajouter votre logique d'envoi ici
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter:', newsletterEmail);
    // Ajouter votre logique d'inscription newsletter ici
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.title}>Contactez-nous</h1>
        <p style={styles.subtitle}>
          Une question ? Un projet ? N'hésitez pas à nous contacter. 
          Notre équipe vous répondra dans les plus brefs délais.
        </p>
      </div>

      {/* Logos Section */}
      <div style={styles.logosContainer}>
        <div style={styles.logo}>LOGOIPSUM</div>
        <div style={styles.logo}>LOGOIPSUM</div>
        <div style={styles.logo}>LOGOIPSUM</div>
        <div style={styles.logo}>LOGOIPSUM</div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Contact Form */}
        <div style={styles.formSection}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formRow}>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={styles.input}
                required
              />
              <input
                type="tel"
                placeholder="Téléphone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                style={styles.input}
              />
            </div>
            <input
              type="text"
              placeholder="Nom complet"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={styles.input}
              required
            />
            <textarea
              placeholder="Votre message..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              style={styles.textarea}
              rows="5"
              required
            />
            <button type="submit" style={styles.submitButton}>
              Envoyer le message
            </button>
          </form>
        </div>

        {/* Newsletter Section */}
        <div style={styles.newsletterSection}>
          <h3 style={styles.newsletterTitle}>Notre Newsletter</h3>
          <p style={styles.newsletterText}>
            Inscrivez-vous pour recevoir nos dernières actualités et offres exclusives.
          </p>
          <form onSubmit={handleNewsletterSubmit} style={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Votre email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              style={styles.newsletterInput}
              required
            />
            <button type="submit" style={styles.newsletterButton}>
              S'inscrire
            </button>
          </form>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div style={styles.infoCards}>
        <div style={styles.infoCard}>
          <div style={styles.icon}>📞</div>
          <h4 style={styles.infoTitle}>(+376) 765 665</h4>
          <p style={styles.infoText}>
            Du lundi au vendredi<br />9h00 - 18h00
          </p>
        </div>
        <div style={styles.infoCard}>
          <div style={styles.icon}>✉️</div>
          <h4 style={styles.infoTitle}>contact@votre-site.com</h4>
          <p style={styles.infoText}>
            Nous vous répondrons<br />sous 24h
          </p>
        </div>
        <div style={styles.infoCard}>
          <div style={styles.icon}>📍</div>
          <h4 style={styles.infoTitle}>Paris, France</h4>
          <p style={styles.infoText}>
            123 Rue de l'Exemple<br />75001 Paris
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div style={styles.mapContainer}>
        <iframe
          title="Localisation"
          src="https://www.google.com/maps/place/Rue+des+Rosiers,+Lom%C3%A9/@6.1638474,1.2090105,17z/data=!3m1!4b1!4m6!3m5!1s0x102158a79b3aade7:0xf3def06edd535c72!8m2!3d6.1638474!4d1.2115854!16s%2Fg%2F11hdpp6x7l?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D"
          style={styles.map}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '0'
  },
  header: {
    backgroundColor: '#e0f2f1',
    padding: '80px 20px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  title: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#263238',
    margin: '0 0 20px 0',
    position: 'relative',
    zIndex: '1'
  },
  subtitle: {
    fontSize: '16px',
    color: '#546e7a',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  logosContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '60px',
    padding: '40px 20px',
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    borderBottom: '1px solid #eceff1'
  },
  logo: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#b0bec5',
    cursor: 'pointer',
    transition: 'color 0.3s'
  },
  mainContent: {
    display: 'flex',
    maxWidth: '1200px',
    margin: '-60px auto 60px',
    padding: '0 20px',
    gap: '30px',
    flexWrap: 'wrap'
  },
  formSection: {
    flex: '2',
    minWidth: '300px',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formRow: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  input: {
    flex: '1',
    minWidth: '200px',
    padding: '16px 20px',
    border: 'none',
    backgroundColor: '#e0f2f1',
    borderRadius: '50px',
    fontSize: '15px',
    outline: 'none',
    transition: 'box-shadow 0.3s'
  },
  textarea: {
    padding: '20px',
    border: 'none',
    backgroundColor: '#e0f2f1',
    borderRadius: '20px',
    fontSize: '15px',
    resize: 'vertical',
    fontFamily: 'inherit',
    outline: 'none',
    minHeight: '150px'
  },
  submitButton: {
    padding: '16px 40px',
    backgroundColor: '#80cbc4',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    transition: 'all 0.3s'
  },
  newsletterSection: {
    flex: '1',
    minWidth: '300px',
    backgroundColor: '#546e7a',
    padding: '40px',
    borderRadius: '20px',
    color: '#fff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  },
  newsletterTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '15px'
  },
  newsletterText: {
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '25px',
    opacity: '0.9'
  },
  newsletterForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  newsletterInput: {
    padding: '14px 20px',
    border: 'none',
    borderRadius: '50px',
    fontSize: '14px',
    outline: 'none'
  },
  newsletterButton: {
    padding: '14px 30px',
    backgroundColor: '#263238',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  infoCards: {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto 60px',
    padding: '0 20px',
    gap: '30px',
    flexWrap: 'wrap'
  },
  infoCard: {
    flex: '1',
    minWidth: '250px',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
  },
  icon: {
    fontSize: '40px',
    marginBottom: '15px'
  },
  infoTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#263238',
    marginBottom: '10px'
  },
  infoText: {
    fontSize: '14px',
    color: '#78909c',
    lineHeight: '1.6'
  },
  mapContainer: {
    maxWidth: '1200px',
    margin: '0 auto 80px',
    padding: '0 20px'
  },
  map: {
    width: '100%',
    height: '400px',
    border: 'none',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  }
};

export default Contact;