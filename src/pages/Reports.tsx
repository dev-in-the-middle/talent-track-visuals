
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from 'lucide-react';

const Reports = () => {
  return (
    <MainLayout title="Reports">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="hiring">Hiring Process</TabsTrigger>
          <TabsTrigger value="sources">Candidate Sources</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Time to Hire", icon: <LineChart className="h-6 w-6 text-purple-600" />, description: "Average days from application to offer" },
              { title: "Candidate Pipeline", icon: <BarChart className="h-6 w-6 text-purple-600" />, description: "Candidates by recruitment stage" },
              { title: "Source Effectiveness", icon: <PieChart className="h-6 w-6 text-purple-600" />, description: "Which sources deliver quality candidates" }
            ].map((report, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    {report.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{report.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                  </div>
                  <Button variant="outline" className="mt-2 w-full">View Report</Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Report visualization placeholder</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="hiring" className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Hiring Pipeline Analysis</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Hiring pipeline report placeholder</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sources" className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Candidate Sources Analysis</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Source effectiveness report placeholder</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Custom Reports Builder</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Custom report builder placeholder</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Reports;
