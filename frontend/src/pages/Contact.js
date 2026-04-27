import React from 'react';

function Contact() {
  return (
    <div style={styles.container}>
      <h1>Contactez-nous</h1>
      <p>Avez-vous une question ? N'hésitez pas à nous envoyer un message.</p>
    </div>
  );
}

const styles = {
  container: { padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '60vh' }
};

export default Contact;
