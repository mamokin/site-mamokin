import React from 'react';

import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PageFooter from '../components/PageFooter';

const IndexPage = () => {
  return (
    <>
    <Layout>
      <section id="main">
        <Header />
        <Footer />
      </section>
      <PageFooter />
    </Layout>
    <div class="area" >
    <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div >
    </>
  )
};

export default IndexPage;
