import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutGrid, 
  Building2, 
  FileText, 
  Activity,
  Shield, 
  Settings as SettingsIcon, 
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
  { icon: <LayoutGrid size={20} />, text: 'Dashboard', path: '/dashboard', active: true },
  { icon: <Building2 size={20} />, text: 'Company', path: '/company' },
  { icon: <FileText size={20} />, text: 'Report', path: '/report' },
  { icon: <Activity size={20} />, text: 'Tracking', path: '/tracking' },
  { icon: <Shield size={20} />, text: 'Security', path: '/security' },
  { icon: <SettingsIcon size={20} />, text: 'Settings', path: '/settings' },
  { icon: <TrendingUp size={20} />, text: 'Upgrade', path: '/upgrade' },
  { icon: <HelpCircle size={20} />, text: 'Help', path: '/help' },
];

const FeatureCard = ({ icon, title, description, action }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#0A192F] rounded-xl p-6 border border-teal-500/20"
  >
    <div className="text-teal-500 mb-4">{icon}</div>
    <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm mb-4">{description}</p>
    {action && (
      <button className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm">
        {action}
      </button>
    )}
  </motion.div>
);

const Sidebar = () => (
  <div className="w-64 h-screen bg-[#0A192F] text-white p-6 fixed left-0 border-r border-teal-500/20">
    <div className="mb-8 flex items-center space-x-2">
      <div className="w-6 h-6">
        <svg viewBox="0 0 24 24" className="text-teal-500 w-full h-full">
          <path
            fill="currentColor"
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          />
        </svg>
      </div>
      <span className="text-xl font-bold">Company</span>
    </div>
    
    <nav className="space-y-4">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
            ${item.active 
              ? 'text-teal-500 bg-teal-500/10' 
              : 'text-gray-400 hover:text-white hover:bg-teal-500/5'
            }`}
        >
          {item.icon}
          <span>{item.text}</span>
        </Link>
      ))}
    </nav>
  </div>
);

const Dashboard1 = () => {
  return (
    <div className="min-h-screen bg-[#051527]">
      <Sidebar />
      
      <div className="ml-64 p-8">
        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Building2 size={24} />}
            title="Company"
            description="A company, abbreviated as co., is a legal entity representing an association of people"
          />
          <FeatureCard
            icon={<FileText size={24} />}
            title="Report"
            description="A report is a document that presents information in an organized format"
          />
          <FeatureCard
            icon={<Activity size={24} />}
            title="Tracking"
            description="A tracking reflects, guides, organizes, and helps you track your progress"
            action="Setup"
          />
          <FeatureCard
            icon={<Shield size={24} />}
            title="Security"
            description="The Security Dashboard lets you view the health of your security settings"
          />
          <FeatureCard
            icon={<SettingsIcon size={24} />}
            title="Settings"
            description="The settings screen is where users will go when they are confused and looking"
          />
          <FeatureCard
            icon={<TrendingUp size={24} />}
            title="Upgrade"
            description="An industry upgrading plan follows the development of a common vision"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard1; 