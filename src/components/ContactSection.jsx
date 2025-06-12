import React from 'react';
import '../css/ContactSection.css';

const ContactSection = () => (
  <section id="contact" class="contact-section">

    <div class="form-container">
      <h2>Contact Us</h2>
      <form id="contactForm">
        <input type="hidden" name="access_key" value="351383b8-e2db-40b6-bf46-28b64be711b3" />
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required placeholder="Your Name" />
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required placeholder="you@example.com" />
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required placeholder="How can we help you?"></textarea>
        <button type="submit">Send Message</button>
        <div id="formMessage" class="message"></div>
      </form>
    </div>

    <div class="iframe-container">
      <h2>DIY Recipes! &hearts;</h2>
      <iframe width="560" height="350" src="https://www.youtube.com/embed/S0gGIH6e2Yk?si=tv-DzM4eX8PWcrQi"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  </section>
);

export default ContactSection;