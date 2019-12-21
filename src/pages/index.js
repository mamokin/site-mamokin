import React from 'react';

import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PageFooter from '../components/PageFooter';
import AnimatedBg from '../components/AnimatedBg';
import About from '../components/About';

const IndexPage = () => {
  return (
    <>
    <Layout>
      <div className='social-card'>
        <section id="main">
          <Header />
          <Footer />
        </section>
      </div>
    </Layout>
    <AnimatedBg/>
    <About/>
    <PageFooter />
    </>
  )
};

export default IndexPage;
