import React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import AnimatedBg from '../components/AnimatedBg';

const SocialCard = () => (
  <div className='full-block--landing'>
    <div className='social-card'>
      <section id="main">
        <Header />
        <Footer />
      </section>
    </div>
    <AnimatedBg />
  </div>
);

export default SocialCard;