import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function NGO() {
  const ngos = [
    {
      name: 'World Wildlife Fund (WWF)',
      description: 'Leading conservation organization working to protect wildlife and their habitats.',
      website: 'https://www.worldwildlife.org',
      focus: 'Wildlife Conservation',
      icon: 'pets',
    },
    {
      name: 'Greenpeace',
      description: 'Global environmental organization campaigning for climate action and environmental protection.',
      website: 'https://www.greenpeace.org',
      focus: 'Climate Action',
      icon: 'public',
    },
    {
      name: 'The Nature Conservancy',
      description: 'Protecting lands and waters on which all life depends through science-based solutions.',
      website: 'https://www.nature.org',
      focus: 'Land & Water Conservation',
      icon: 'water_drop',
    },
    {
      name: 'Sierra Club',
      description: 'America\'s largest grassroots environmental organization promoting clean energy and conservation.',
      website: 'https://www.sierraclub.org',
      focus: 'Clean Energy',
      icon: 'wb_sunny',
    },
    {
      name: 'Ocean Conservancy',
      description: 'Working to protect the ocean from today\'s greatest global challenges.',
      website: 'https://oceanconservancy.org',
      focus: 'Ocean Protection',
      icon: 'waves',
    },
    {
      name: 'Rainforest Alliance',
      description: 'Creating a more sustainable world by using social and market forces to protect nature.',
      website: 'https://www.rainforest-alliance.org',
      focus: 'Forest Conservation',
      icon: 'park',
    },
    {
      name: '350.org',
      description: 'Building a global grassroots movement to solve the climate crisis.',
      website: 'https://350.org',
      focus: 'Climate Movement',
      icon: 'groups',
    },
    {
      name: 'Environmental Defense Fund',
      description: 'Finding practical and lasting solutions to the most serious environmental problems.',
      website: 'https://www.edf.org',
      focus: 'Environmental Solutions',
      icon: 'lightbulb',
    },
  ];

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
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-eco-primary mb-4">
                Environmental NGOs
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Connect with leading organizations making a difference for our planet. 
                Support their mission and get involved in environmental action.
              </p>
            </div>

            {/* NGO Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ngos.map((ngo, index) => (
                <motion.div
                  key={ngo.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 bg-eco-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="material-icons text-3xl text-eco-primary">
                      {ngo.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {ngo.name}
                  </h3>
                  
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-eco-primary/20 text-eco-primary text-xs font-medium rounded-full">
                      {ngo.focus}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {ngo.description}
                  </p>

                  {/* Link */}
                  <a
                    href={ngo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-eco-primary hover:text-eco-secondary font-medium transition-colors group"
                  >
                    Visit Website
                    <span className="material-icons text-sm ml-1 group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="mt-12 bg-lime-50 border-2 border-lime-200 rounded-lg p-8 text-center"
            >
              <h2 className="text-2xl font-bold mb-4 text-green-900">Get Involved</h2>
              <p className="text-lg mb-6 text-green-800">
                Every action counts. Support these organizations through donations, volunteering, 
                or spreading awareness about their important work.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="inline-flex items-center space-x-2 bg-lime-200 text-green-800 px-4 py-2 rounded-full font-medium">
                  <span className="material-icons">volunteer_activism</span>
                  <span>Donate</span>
                </span>
                <span className="inline-flex items-center space-x-2 bg-lime-200 text-green-800 px-4 py-2 rounded-full font-medium">
                  <span className="material-icons">handshake</span>
                  <span>Volunteer</span>
                </span>
                <span className="inline-flex items-center space-x-2 bg-lime-200 text-green-800 px-4 py-2 rounded-full font-medium">
                  <span className="material-icons">campaign</span>
                  <span>Advocate</span>
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
