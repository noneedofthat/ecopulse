import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-12"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-eco-primary mb-8">About EcoPulse</h1>
            
            <div className="prose max-w-none space-y-6">
              <section className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  EcoPulse is dedicated to raising environmental awareness by providing real-time news
                  and information about our planet's most pressing ecological challenges. We believe that
                  informed citizens are empowered citizens, and that knowledge is the first step toward
                  meaningful action.
                </p>
              </section>

              <section className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  How It Works
                </h2>
                <p className="text-gray-700 mb-4">
                  EcoPulse aggregates environmental news from trusted sources worldwide, bringing you
                  the latest updates on:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Climate Change and Global Warming</li>
                  <li>Wildlife Conservation and Biodiversity</li>
                  <li>Pollution and Environmental Health</li>
                  <li>Renewable Energy and Sustainability</li>
                </ul>
              </section>

              <section className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Data Sources
                </h2>
                <p className="text-gray-700 mb-4">
                  We partner with The Guardian's Open Platform to deliver accurate, up-to-date environmental 
                  news from one of the world's most trusted news organizations. The Guardian's award-winning 
                  journalism and comprehensive environmental coverage ensures you receive high-quality, 
                  reliable information about the planet's most pressing ecological challenges.
                </p>
                <p className="text-gray-700">
                  Our platform filters and categorizes content to ensure you receive the most relevant 
                  information about climate change, conservation, renewable energy, and sustainability.
                </p>
              </section>

              <section className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Join the Movement
                </h2>
                <p className="text-gray-700 mb-4">
                  Together, we can make a difference. Stay informed, take action, and be part of the
                  solution. Every small step counts toward a more sustainable future for our planet.
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
