"use client";
import Header from '@/app/components/portfolio/Header';
import Home from '@/app/components/portfolio/Home';
import About from '@/app/components/portfolio/About';
import React from 'react'
import Contact from '@/app/components/portfolio/Contact';
import Footer from '@/app/components/portfolio/Footer';
import Story from '@/app/components/portfolio/Story';

const Page: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Home />
        <About />
        <Story />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default Page;