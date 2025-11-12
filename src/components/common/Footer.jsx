export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Twitter', icon: 'X', url: 'https://x.com/ClimateEcoPulse' },
    { name: 'Instagram', icon: 'photo_camera', url: 'https://www.instagram.com/climatexecopulse/' },
    { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/profile.php?id=61583796807617' },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="EcoPulse Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-eco-primary">EcoPulse</span>
            </div>
            <p className="text-gray-600 text-sm">
              Raising environmental awareness through real-time news and information.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-2">
              <a
                href="mailto:climatexecopulse@gmail.com"
                className="flex items-center text-gray-600 hover:text-eco-primary transition-colors text-sm"
              >
                <span className="material-icons text-sm mr-2">email</span>
                climatexecopulse@gmail.com
              </a>
            </div>
          </div>

          {/* Social Links Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-200 rounded-full hover:bg-eco-primary hover:text-white transition-all"
                  aria-label={social.name}
                  title={social.name}
                >
                  <span className="material-icons text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} EcoPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
