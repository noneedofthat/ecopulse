import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import NewsFeed from '../components/news/NewsFeed';
import QuoteOfTheDay from '../components/home/QuoteOfTheDay';
import TakeActionSection from '../components/home/TakeActionSection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-eco-primary/10 via-transparent to-transparent py-12">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                >
                  Welcome to EcoPulse
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
                >
                  Stay informed about environmental issues with real-time news and take action for a sustainable future
                </motion.p>
              </div>

              {/* Quote of the Day */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="max-w-4xl mx-auto mb-12"
              >
                <QuoteOfTheDay />
              </motion.div>
            </div>
          </section>

          {/* Take Action Section */}
          <section className="container mx-auto px-4 py-12">
            <TakeActionSection />
          </section>

          {/* News Feed Section */}
          <section className="container mx-auto px-4 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Latest Environmental News
              </h2>
              <p className="text-gray-600">
                Real-time updates on climate, wildlife, pollution, and renewable energy
              </p>
            </div>
            <NewsFeed />
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
