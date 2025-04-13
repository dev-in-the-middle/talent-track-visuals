
import { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  BriefcaseBusiness, 
  Calendar 
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import StatCard from '@/components/dashboard/StatCard';
import ApplicantsChart from '@/components/dashboard/ApplicantsChart';
import RecentCandidates from '@/components/dashboard/RecentCandidates';
import SourcesChart from '@/components/dashboard/SourcesChart';
import StagesPipeline from '@/components/dashboard/StagesPipeline';

const Dashboard = () => {
  // Mock data for statistics
  const stats = [
    { 
      title: "Total Applicants", 
      value: "358", 
      change: "12%", 
      isPositive: true, 
      icon: <Users size={24} /> 
    },
    { 
      title: "Interviews Scheduled", 
      value: "42", 
      change: "8%", 
      isPositive: true, 
      icon: <Calendar size={24} /> 
    },
    { 
      title: "Positions Open", 
      value: "16", 
      change: "5%", 
      isPositive: false, 
      icon: <BriefcaseBusiness size={24} /> 
    },
    { 
      title: "Candidates Hired", 
      value: "12", 
      change: "20%", 
      isPositive: true, 
      icon: <UserCheck size={24} /> 
    }
  ];

  return (
    <MainLayout title="Dashboard">
      <div className="space-y-6 animate-fade-in">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              isPositive={stat.isPositive}
              icon={stat.icon}
            />
          ))}
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ApplicantsChart title="Weekly Application Trends" />
          <StagesPipeline />
        </div>
        
        {/* Recent Candidates & Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentCandidates />
          </div>
          <div>
            <SourcesChart />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
