import React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import AnimatedBg from '../components/AnimatedBg';
import About from '../components/About';

const IndexPage = () => {
  return (
    <>
      <div className={`full-block--landing`}>
        <div className='social-card'>
          <section id="main">
            <Header />
            <Footer />
          </section>
        </div>
        <AnimatedBg />
      </div>
      <div className='full-block bg'>
        <About />
      </div>
    </>
  )
};

export default IndexPage;
