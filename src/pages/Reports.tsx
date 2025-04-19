import { Button } from "@/components/ui/button";
import MainLayout from '@/components/layout/MainLayout';

const Reports = () => {
  return (
    <MainLayout title="Reports">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Reports & Analytics</h2>
        <p className="text-gray-600 mb-6">View and generate reports about your recruitment process.</p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Button className="p-6 text-left">
            <div>
              <h3 className="font-semibold mb-2">Hiring Pipeline Report</h3>
              <p className="text-sm text-gray-600">Track candidates through each stage</p>
            </div>
          </Button>
          
          <Button variant="outline" className="p-6 text-left">
            <div>
              <h3 className="font-semibold mb-2">Time-to-Hire Analysis</h3>
              <p className="text-sm text-gray-600">Measure recruitment efficiency</p>
            </div>
          </Button>
          
          <Button variant="outline" className="p-6 text-left">
            <div>
              <h3 className="font-semibold mb-2">Source Quality Report</h3>
              <p className="text-sm text-gray-600">Evaluate candidate sources</p>
            </div>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
