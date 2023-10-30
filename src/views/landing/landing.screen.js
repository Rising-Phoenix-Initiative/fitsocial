import React from 'react';
import Hero from './components/hero.component';
import Features from './components/features.component';
import Testimonials from './components/testimonials.component';
import FAQ from './components/faq.component';
import Footer from './components/footer.component';

const LandingPage = () => {
    return (
        <>
            <Hero />
            <Features />
            <Testimonials />
            <FAQ />
            <Footer />
        </>
    );
};

export default LandingPage;