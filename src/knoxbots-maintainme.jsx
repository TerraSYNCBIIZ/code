import React from 'react';
import './index.css';

export default function MaintainMEBrochure() {
  return (
    <div className="max-w-[8.5in] mx-auto p-8 bg-white text-black">
      <header className="mb-6 pb-4 border-b-2 border-gray-300 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">MaintainME</h1>
          <p className="text-lg text-blue-600">by KnoxBots Robotics</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">KnoxBots Robotics</p>
          <p>123 Innovation Drive</p>
          <p>Knoxville, TN 37932</p>
          <p>865-555-0123</p>
          <p>www.knoxbotsrobotics.com</p>
        </div>
      </header>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Robotic Fleet Maintenance Solution</h2>
        <p className="mb-4">
          MaintainME is a comprehensive maintenance management system designed specifically for robotic fleets. Our solution helps facilities reduce downtime, extend robot lifespan, and optimize maintenance resources through preventative maintenance scheduling, real-time monitoring, and detailed analytics.
        </p>
        <div className="flex justify-center">
          <img src="https://via.placeholder.com/600x300?text=MaintainME+Dashboard" alt="MaintainME Dashboard" className="rounded-lg shadow-md" />
        </div>
      </div>

      <div className="mb-8 no-break">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Key Features</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Preventative Maintenance</h3>
            <p>Schedule and track regular maintenance tasks based on runtime hours, cycles, or calendar time to prevent unexpected failures.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Real-time Monitoring</h3>
            <p>Monitor robot health metrics in real-time to detect potential issues before they cause downtime.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Maintenance History</h3>
            <p>Comprehensive records of all maintenance activities, parts replaced, and technician notes for each robot.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Inventory Management</h3>
            <p>Track spare parts inventory, set reorder points, and manage consumables to ensure parts availability.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Performance Analytics</h3>
            <p>Analyze maintenance data to identify recurring issues, optimize maintenance schedules, and extend robot lifespan.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Technician Management</h3>
            <p>Assign tasks to technicians, track completion times, and manage certification and training records.</p>
          </div>
        </div>
      </div>

      <div className="mb-8 no-break">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Compatible Robot Models</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 p-2 text-left">Manufacturer</th>
              <th className="border border-gray-300 p-2 text-left">Robot Types</th>
              <th className="border border-gray-300 p-2 text-left">Integration Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">ABB</td>
              <td className="border border-gray-300 p-2">IRB Series, GoFa Series, SCARA</td>
              <td className="border border-gray-300 p-2">Full API Integration</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">FANUC</td>
              <td className="border border-gray-300 p-2">CR Series, LR Mate, M Series</td>
              <td className="border border-gray-300 p-2">Full API Integration</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">KUKA</td>
              <td className="border border-gray-300 p-2">KR Series, LBR iiwa, KMR Series</td>
              <td className="border border-gray-300 p-2">Full API Integration</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Universal Robots</td>
              <td className="border border-gray-300 p-2">UR3, UR5, UR10, UR16, UR20</td>
              <td className="border border-gray-300 p-2">Full API Integration</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Mobile Robots</td>
              <td className="border border-gray-300 p-2">MiR, Fetch, Locus, Magazino</td>
              <td className="border border-gray-300 p-2">API Integration (Select Models)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Others</td>
              <td className="border border-gray-300 p-2">Yaskawa, Epson, Doosan, Omron</td>
              <td className="border border-gray-300 p-2">Basic Integration</td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm mt-2 text-gray-600">* Additional robot models can be integrated upon request. Contact our engineering team for details.</p>
      </div>

      <div className="mb-8 no-break">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Service Plans</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2 text-center text-blue-600">Basic</h3>
            <p className="text-center text-2xl font-bold mb-4">$1,500<span className="text-sm font-normal">/month</span></p>
            <p className="text-center mb-4 text-sm">For facilities with up to 10 robots</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Preventative maintenance planning</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Maintenance history tracking</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Basic inventory management</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Email notifications</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Standard reports</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span className="text-gray-500">Real-time monitoring</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span className="text-gray-500">Advanced analytics</span>
              </li>
            </ul>
          </div>
          <div className="border-2 border-blue-600 rounded-lg p-4 shadow-md transform scale-105">
            <div className="bg-blue-600 text-white text-center py-1 rounded-t-lg mx-[-1rem] mt-[-1rem] mb-3">
              MOST POPULAR
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center text-blue-600">Professional</h3>
            <p className="text-center text-2xl font-bold mb-4">$3,000<span className="text-sm font-normal">/month</span></p>
            <p className="text-center mb-4 text-sm">For facilities with up to 25 robots</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>All Basic features</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Real-time monitoring</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Advanced inventory with auto-reorder</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Mobile app access</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Custom reporting</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>8/5 Technical support</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span className="text-gray-500">Predictive maintenance AI</span>
              </li>
            </ul>
          </div>
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2 text-center text-blue-600">Enterprise</h3>
            <p className="text-center text-2xl font-bold mb-4">$5,500<span className="text-sm font-normal">/month</span></p>
            <p className="text-center mb-4 text-sm">For facilities with 25+ robots</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>All Professional features</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Predictive maintenance AI</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Custom API integrations</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Multi-site management</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Advanced analytics dashboard</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>24/7 Technical support</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Dedicated account manager</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-4">
          <span className="bg-blue-600 text-white px-4 py-2 rounded-full inline-block">Contact us for a personalized quote</span>
        </p>
      </div>

      <div className="mb-8 no-break">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Warranty & Support Comparison</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 p-2"></th>
              <th className="border border-gray-300 p-2 text-center">Basic</th>
              <th className="border border-gray-300 p-2 text-center">Professional</th>
              <th className="border border-gray-300 p-2 text-center">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Software Updates</td>
              <td className="border border-gray-300 p-2 text-center">Quarterly</td>
              <td className="border border-gray-300 p-2 text-center">Monthly</td>
              <td className="border border-gray-300 p-2 text-center">Monthly + Priority</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Support Hours</td>
              <td className="border border-gray-300 p-2 text-center">8/5</td>
              <td className="border border-gray-300 p-2 text-center">8/5</td>
              <td className="border border-gray-300 p-2 text-center">24/7</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Response Time</td>
              <td className="border border-gray-300 p-2 text-center">Next Business Day</td>
              <td className="border border-gray-300 p-2 text-center">4 Hours</td>
              <td className="border border-gray-300 p-2 text-center">1 Hour</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">User Training</td>
              <td className="border border-gray-300 p-2 text-center">2 Sessions</td>
              <td className="border border-gray-300 p-2 text-center">4 Sessions</td>
              <td className="border border-gray-300 p-2 text-center">Unlimited</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Implementation Support</td>
              <td className="border border-gray-300 p-2 text-center">Remote Only</td>
              <td className="border border-gray-300 p-2 text-center">Remote + 1 On-site</td>
              <td className="border border-gray-300 p-2 text-center">Remote + 3 On-site</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Hardware Warranty</td>
              <td className="border border-gray-300 p-2 text-center">1 Year</td>
              <td className="border border-gray-300 p-2 text-center">2 Years</td>
              <td className="border border-gray-300 p-2 text-center">3 Years</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Account Management</td>
              <td className="border border-gray-300 p-2 text-center">Shared</td>
              <td className="border border-gray-300 p-2 text-center">Shared</td>
              <td className="border border-gray-300 p-2 text-center">Dedicated</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-8 no-break">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Implementation Process</h2>
        <div className="flex justify-between">
          <div className="flex flex-col items-center w-1/5">
            <div className="rounded-full bg-blue-600 text-white w-12 h-12 flex items-center justify-center text-xl font-bold mb-2">1</div>
            <h3 className="text-lg font-semibold text-center mb-2">Assessment</h3>
            <p className="text-center text-sm">Evaluate robot fleet and maintenance needs</p>
          </div>
          <div className="w-1/6 h-0.5 bg-blue-300 self-center"></div>
          <div className="flex flex-col items-center w-1/5">
            <div className="rounded-full bg-blue-600 text-white w-12 h-12 flex items-center justify-center text-xl font-bold mb-2">2</div>
            <h3 className="text-lg font-semibold text-center mb-2">Installation</h3>
            <p className="text-center text-sm">Deploy software and integration hardware</p>
          </div>
          <div className="w-1/6 h-0.5 bg-blue-300 self-center"></div>
          <div className="flex flex-col items-center w-1/5">
            <div className="rounded-full bg-blue-600 text-white w-12 h-12 flex items-center justify-center text-xl font-bold mb-2">3</div>
            <h3 className="text-lg font-semibold text-center mb-2">Configuration</h3>
            <p className="text-center text-sm">Set up maintenance schedules and alerts</p>
          </div>
          <div className="w-1/6 h-0.5 bg-blue-300 self-center"></div>
          <div className="flex flex-col items-center w-1/5">
            <div className="rounded-full bg-blue-600 text-white w-12 h-12 flex items-center justify-center text-xl font-bold mb-2">4</div>
            <h3 className="text-lg font-semibold text-center mb-2">Training</h3>
            <p className="text-center text-sm">User training and operational support</p>
          </div>
        </div>
        <p className="mt-4 text-center">Typical implementation time: 2-4 weeks depending on fleet size and complexity</p>
      </div>

      <div className="mb-8 no-break">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Customer Success Stories</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <span className="text-4xl text-blue-600 mr-3">"</span>
              <div>
                <h3 className="font-semibold">Automotive Manufacturing Plant</h3>
                <p className="text-sm text-gray-600">Major US Auto Manufacturer</p>
              </div>
            </div>
            <p className="mb-3">
              "MaintainME reduced our robot downtime by 37% in the first six months. The predictive maintenance features helped us identify issues before they caused production stops, saving us an estimated $2.4M in lost production time."
            </p>
            <p className="text-sm text-right">- John D., Maintenance Director</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <span className="text-4xl text-blue-600 mr-3">"</span>
              <div>
                <h3 className="font-semibold">E-commerce Fulfillment Center</h3>
                <p className="text-sm text-gray-600">Global E-commerce Company</p>
              </div>
            </div>
            <p className="mb-3">
              "With a fleet of 120+ mobile robots, maintenance was becoming unmanageable. MaintainME's centralized system allowed us to optimize our maintenance schedules and reduce our spare parts inventory by 22%, while improving robot availability to 98.3%."
            </p>
            <p className="text-sm text-right">- Sarah T., Operations Manager</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Contact Information</h2>
        <div className="flex">
          <div className="w-1/2 pr-4">
            <h3 className="text-xl font-semibold mb-2">Sales Department</h3>
            <p>Email: sales@knoxbotsrobotics.com</p>
            <p>Phone: 865-555-0123</p>
            <p className="mt-4">Schedule a demo or request a custom quote for your facility's specific needs.</p>
          </div>
          <div className="w-1/2 pl-4">
            <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
            <p>Email: support@knoxbotsrobotics.com</p>
            <p>Phone: 865-555-0199</p>
            <p className="mt-4">Available for existing customers based on service plan level.</p>
          </div>
        </div>
      </div>

      <footer className="mt-10 pt-4 border-t-2 border-gray-300 text-center text-sm text-gray-600">
        <p>© 2023 KnoxBots Robotics, Inc. All rights reserved.</p>
        <p className="mt-1">MaintainME is a registered trademark of KnoxBots Robotics, Inc.</p>
        <p className="mt-1">Prices and specifications subject to change without notice. Contact sales for current pricing.</p>
      </footer>
    </div>
  );
} 