import { motion } from 'framer-motion';
import FeedbackForm from '../components/feedback/FeedbackForm';
import FeedbackDisplay from '../components/feedback/FeedbackDisplay';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function Feedback() {
  const handleFeedbackSuccess = () => {
    // Optionally refresh the feedback display
    window.location.reload();
  };

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
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                We Value Your Feedback
              </h1>
              <p className="text-lg text-gray-600">
                Help us improve EcoPulse by sharing your thoughts and experiences
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Feedback Form */}
              <div>
                <FeedbackForm onSuccess={handleFeedbackSuccess} />
              </div>

              {/* Feedback Display */}
              <div>
                <FeedbackDisplay />
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
