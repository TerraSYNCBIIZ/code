import React from 'react';
import './index.css';

const MaintainMEBrochure = () => {
  return (
    <div className="font-sans antialiased bg-gray-100 min-h-screen flex justify-center p-4 print:p-0 print:bg-white">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-4xl w-full print:shadow-none">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ed9708] to-[#d68000] p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="#fff" fillOpacity="0.05" />
              <circle cx="10" cy="10" r="20" fill="#fff" fillOpacity="0.05" />
              <circle cx="90" cy="90" r="30" fill="#fff" fillOpacity="0.05" />
              <circle cx="50" cy="50" r="50" fill="#fff" fillOpacity="0.05" />
            </svg>
          </div>
          
          <div className="flex items-center mb-6 relative z-10">
            <div className="mr-4">
              <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="2"/>
                <path d="M50 15 L85 75 L15 75 Z" fill="white" transform="rotate(30 50 50)"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">KNOXBOTS</h1>
              <p className="text-white text-sm tracking-widest uppercase">ROBOTIC MOWING</p>
            </div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-2">MaintainME Plan</h2>
            <p className="text-white text-xl opacity-90">Professional Care for Your Robotic Mower</p>
          </div>
        </div>
        
        {/* Warranty Comparison */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Standard vs. MaintainME Coverage</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Standard Warranty Column */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 relative">
              <div className="absolute -top-3 right-4 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                Limited Coverage
              </div>
              
              <div className="flex items-center mb-4">
                <div className="text-red-500 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Standard Warranty</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="text-red-500 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Limited Defect Coverage</p>
                    <p className="text-gray-600 text-sm">Only covers manufacturer defects, excluding wear and tear.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="text-red-500 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">No Proactive Maintenance</p>
                    <p className="text-gray-600 text-sm">No scheduled inspections or preventative actions.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="text-red-500 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Delayed Response Time</p>
                    <p className="text-gray-600 text-sm">Typically responds within 48 hours, with no guaranteed timeframe.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="text-red-500 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Unexpected Costs</p>
                    <p className="text-gray-600 text-sm">Additional fees for labor and parts not included.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* MaintainME Coverage Column */}
            <div className="bg-gray-50 rounded-lg p-6 border border-[#ed9708] relative">
              <div className="absolute -top-3 right-4 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                Comprehensive Care
              </div>
              
              <div className="flex items-center mb-4">
                <div className="text-[#ed9708] mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">MaintainME Coverage</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="text-green-500 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Comprehensive Protection</p>
                    <p className="text-gray-600 text-sm">Covers wear, tear, and manufacturer defects.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="text-green-500 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Proactive Maintenance</p>
                    <p className="text-gray-600 text-sm">Scheduled inspections and preventative maintenance included.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="text-green-500 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Rapid Response</p>
                    <p className="text-gray-600 text-sm">Guaranteed response within 48 hours, striving for 24-hour support.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="text-green-500 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">All-Inclusive Pricing</p>
                    <p className="text-gray-600 text-sm">No hidden fees; all parts and labor included.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="text-green-500 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Extended Warranty</p>
                    <p className="text-gray-600 text-sm">One-year extension on Husqvarna warranty when purchased with new mower.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Why Choose Section */}
        <div className="p-8 bg-gray-50">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Why Choose</h2>
          <h2 className="text-2xl font-bold text-center mb-8">Maintain<span className="text-[#ed9708]">ME</span>?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-[#ed9708] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ed9708]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Proactive Maintenance</h3>
              <p className="text-gray-600">Stay ahead with regular inspections and preventative care to minimize downtime.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-[#ed9708] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ed9708]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Cost-Effectiveness</h3>
              <p className="text-gray-600">Predictable monthly expenses with no surprise charges for parts or labor.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-[#ed9708] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ed9708]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Expert Support</h3>
              <p className="text-gray-600">Get assistance from our knowledgeable technicians whenever needed.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-[#ed9708] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ed9708]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Peace of Mind</h3>
              <p className="text-gray-600">Focus on your core business while we ensure your equipment runs smoothly.</p>
            </div>
          </div>
        </div>
        
        {/* Pricing Section */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">MaintainME Premium Plan</h2>
          
          <div className="bg-white rounded-lg border border-[#ed9708] overflow-hidden shadow-lg max-w-2xl mx-auto">
            <div className="bg-[#ed9708] p-6 text-white text-center relative">
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                Recommended
              </div>
              <h3 className="text-2xl font-bold mb-2">MaintainME Premium</h3>
              <div className="flex justify-center items-baseline">
                <span className="text-5xl font-extrabold">$59</span>
                <span className="text-xl ml-1">/acre/month</span>
              </div>
              <p className="mt-1 opacity-90">First Acre: $100/month</p>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 font-medium mb-4">Comprehensive coverage with rapid response and all-inclusive service</p>
              
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">24/7 monitoring & rapid response (within 48 hours)</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">All labor included - no hourly charges</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Monthly manager check-ins</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Comprehensive winter storage & servicing</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Advanced fleet monitoring & analytics</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Quarterly maintenance included</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">All software updates & service bulletins</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Regular blade changes</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Husqvarna warranty extended by 1 year (for plans purchased with new mower)</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Parts at cost for out-of-warranty repairs (for plans purchased after mower)</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Service Tiers */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-center text-gray-800 mb-6">Service Tiers</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-[#ed9708]">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Athletic Tier</h4>
                <p className="text-gray-600 mb-4">Ideal for golf courses, sports fields, and premium properties.</p>
                <div className="flex items-center text-[#ed9708] font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Blade replacement every two weeks
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-[#ed9708]">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Pro Tier</h4>
                <p className="text-gray-600 mb-4">Perfect for businesses, schools, and high-standard residential properties.</p>
                <div className="flex items-center text-[#ed9708] font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Blade replacement every four weeks
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-[#ed9708]">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Residential Tier</h4>
                <p className="text-gray-600 mb-4">Great for standard residential lawns with normal usage patterns.</p>
                <div className="flex items-center text-[#ed9708] font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Blade replacement every six weeks
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="bg-gray-900 text-white p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to get started?</h2>
            <p className="mb-8">Contact us today to set up your MaintainME plan and enjoy worry-free robotic lawn care.</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#ed9708] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ed9708]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-1">Phone</h3>
                <p className="text-gray-300">(865) 888-0049</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#ed9708] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ed9708]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-1">Email</h3>
                <p className="text-gray-300">hello@knoxbots.com</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#ed9708] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ed9708]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-1">Address</h3>
                <p className="text-gray-300">121 E Jackson Ave, Box 4</p>
                <p className="text-gray-300">Knoxville, TN 37915</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-800 text-white text-center p-4 text-sm">
          <p>© 2023 KNOXBOTS, LLC. All rights reserved.</p>
        </div>
      </div>
      
      <button 
        className="fixed bottom-6 right-6 bg-[#ed9708] text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 hover:bg-[#d68000] transition-colors duration-200 print:hidden"
        onClick={() => window.print()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        <span>Print Brochure</span>
      </button>
    </div>
  );
};

export default MaintainMEBrochure; 