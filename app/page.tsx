// pages/index.js
import Image from 'next/image';
import Head from 'next/head';
import Footer from './components/home/Footer';
import TestimonialsSection from './components/home/TestimonialSection';
import ContactForm from './components/home/ContactForm';
// import HeroSection from './components/home/HeroSection';



export default function Home() {
  return (
    <main className="max-w-[1500px] mx-auto px-6">  
     <Head>
        <title>FutureShujaa - Empowering Students with Tech Skills</title>
        <meta
          name="description"
          content="An E-learning platform to provide tech skills to students in informal settlements in Kenya."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* <HeroSection/> */}

      <main className="p-8">
      <section className="mb-12 flex flex-col items-center justify-center py-12 bg-white">
  <div className="container mx-auto px-6 text-center md:text-left md:flex md:items-center md:justify-between">
    <div className="md:w-1/2">
      <h2 className="text-3xl font-semibold text-airbnb mb-6">About Us</h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        FutureShujaa is an innovative e-learning platform designed to deliver tech skills
        training to students in informal settlements across Kenya. Our mission is to bridge
        the digital literacy gap and empower underserved communities with tools for economic
        and social advancement.
      </p>
    </div>
    {/* Right: Image */}
    <div className="mt-8 md:mt-0 md:w-1/2">
      <img
        src="/kenya.jpeg"  
        alt="Kenya"
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
  </div>
</section>

<section className="mb-12 flex flex-col items-center justify-center py-12 bg-white">
  <div className="container mx-auto px-6 text-center md:text-left md:flex md:items-center md:justify-between">
    {/* Left: Image */}
    <div className="md:w-1/2">
      <img
        src="/robot.jpeg"  
        alt="Robot"
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
    <div className="mt-8 ml-6 md:mt-0 md:w-1/2">
      <h2 className="text-3xl font-semibold text-airbnb mb-6">Our Vision</h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        To create an equitable society by enabling access to quality digital education and
        reducing youth unemployment through scalable, interactive e-learning solutions.
      </p>
    </div>
  </div>
</section>

<section className="mb-12 flex flex-col items-center justify-center py-12 bg-white">
  <div className="container mx-auto px-6 text-center md:text-left md:flex md:items-center md:justify-between">
    <div className="md:w-1/2">
      <h2 className="text-3xl font-semibold text-airbnb mb-6">Our Objectives</h2>
      <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
        <li>Empower students in informal settlements with market-relevant digital skills.</li>
        <li>Bridge the gap caused by teacher shortages and outdated educational resources.</li>
      </ul>
    </div>
    {/* Right: Image */}
    <div className="mt-8 md:mt-0 md:w-1/2">
      <img
        src="/lion.jpeg" 
        alt="Lion"
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
  </div>
</section>


    <TestimonialsSection />
    <ContactForm />
  </main>
      <Footer />

    </main>
  );
}

