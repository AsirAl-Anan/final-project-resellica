import React from 'react';

const Footer = () => {
  const footerLinks = {
    buy: [
      { title: 'Registration' },
      { title: 'Bidding & buying help' },
      { title: 'Stores' },
      { title: 'Curator Collections' },
      { title: 'Resellica for Charity' },
      { title: 'Charity Shop' },
      { title: 'Seasonal Sales and events' },
      { title: 'Resellica Gift Cards' }
    ],
    sell: [
      { title: 'Start selling' },
      { title: 'How to sell' },
      { title: 'Business sellers' },
      { title: 'Affiliates' }
    ],
    tools: [
      { title: 'Developers' },
      { title: 'Security center' },
      { title: 'Site map' }
    ],
    companies: [
      { title: 'TCGplayer' }
    ],
    about: [
      { title: 'Company info' },
      { title: 'News' },
      { title: 'Deferred Prosecution Agreement with District of Massachusetts' },
      { title: 'Investors' },
      { title: 'Careers' },
      { title: 'Diversity & Inclusion' },
      { title: 'Global Impact' },
      { title: 'Government relations' },
      { title: 'Advertise with us' },
      { title: 'Policies' },
      { title: 'Verified Rights Owner (VeRO) Program' },
      { title: 'eCI Licenses' }
    ],
    help: [
      { title: 'Seller Center' },
      { title: 'Contact Us' },
      { title: 'Resellica Returns' },
      { title: 'Resellica Money Back Guarantee' }
    ],
    community: [
      { title: 'Announcements' },
      { title: 'Resellica Community' },
      { title: 'Resellica for Business Podcast' }
    ]
  };

  return (
    <footer className="bg-white pt-12 pb-6 text-sm border-t">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-6 gap-8 mb-12">
          <div>
            <h3 className="font-bold mb-3">Buy</h3>
            <ul className="space-y-2">
              {footerLinks.buy.map(link => (
                <li key={link.title}>
                  <a href="#" className="text-gray-600 hover:underline">{link.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">Sell</h3>
            <ul className="space-y-2">
              {footerLinks.sell.map(link => (
                <li key={link.title}>
                  <a href="#" className="text-gray-600 hover:underline">{link.title}</a>
                </li>
              ))}
            </ul>

            <h3 className="font-bold mt-6 mb-3">Tools & apps</h3>
            <ul className="space-y-2">
              {footerLinks.tools.map(link => (
                <li key={link.title}>
                  <a href="#" className="text-gray-600 hover:underline">{link.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">Resellica companies</h3>
            <ul className="space-y-2">
              {footerLinks.companies.map(link => (
                <li key={link.title}>
                  <a href="#" className="text-gray-600 hover:underline">{link.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">About Resellica</h3>
            <ul className="space-y-2">
              {footerLinks.about.map(link => (
                <li key={link.title}>
                  <a href="#" className="text-gray-600 hover:underline">{link.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">Help & Contact</h3>
            <ul className="space-y-2">
              {footerLinks.help.map(link => (
                <li key={link.title}>
                  <a href="#" className="text-gray-600 hover:underline">{link.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map(link => (
                <li key={link.title}>
                  <a href="#" className="text-gray-600 hover:underline">{link.title}</a>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h3 className="font-bold mb-3">Resellica Sites</h3>
              <button className="flex items-center gap-2 border rounded px-3 py-2">
                <img src="/api/placeholder/20/20" alt="US Flag" className="w-5" />
                <span>United States</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="text-gray-600 text-xs border-t pt-6">
          <p>
            Copyright © 1995-2025 Resellica Inc. All Rights Reserved. 
            <a href="#" className="text-[#3665F3] hover:underline ml-1">Accessibility</a>,
            <a href="#" className="text-[#3665F3] hover:underline ml-1">User Agreement</a>,
            <a href="#" className="text-[#3665F3] hover:underline ml-1">Privacy</a>,
            <a href="#" className="text-[#3665F3] hover:underline ml-1">Cookies</a>,
            <a href="#" className="text-[#3665F3] hover:underline ml-1">Your Privacy Choices</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;