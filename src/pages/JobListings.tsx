import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, MoreHorizontal, LayoutGrid, List } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import RequisitionForm from '@/components/jobs/RequisitionForm';
import JobListingForm from '@/components/jobs/JobListingForm';

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  status: 'draft' | 'published' | 'closed';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  screeningQuestions: {
    id: string;
    question: string;
    type: 'text' | 'choice' | 'boolean';
    required: boolean;
  }[];
  createdAt: string;
}

interface Requisition {
  id: string;
  department: string;
  managerName: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
}

const JobListings = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [requisitions, setRequisitions] = useState<Requisition[]>([
    {
      id: 'REQ-001',
      department: 'Engineering',
      managerName: 'John Doe',
      status: 'approved',
      createdAt: '2024-01-10'
    },
    {
      id: 'REQ-002',
      department: 'Marketing',
      managerName: 'Jane Smith',
      status: 'pending',
      createdAt: '2024-01-15'
    },
    {
      id: 'REQ-003',
      department: 'Sales',
      managerName: 'Mike Johnson',
      status: 'rejected',
      createdAt: '2024-01-12'
    }
  ]);
  const [jobs, setJobs] = useState<JobListing[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      status: 'published',
      salary: {
        min: 120000,
        max: 160000,
        currency: 'USD'
      },
      description: 'We are looking for a Senior Frontend Developer...',
      requirements: [
        'Minimum 5 years of experience with React',
        'Strong understanding of modern JavaScript',
        'Experience with TypeScript'
      ],
      screeningQuestions: [
        {
          id: 'q1',
          question: 'How many years of React experience do you have?',
          type: 'text',
          required: true
        },
        {
          id: 'q2',
          question: 'Are you willing to work in a remote environment?',
          type: 'boolean',
          required: true
        }
      ],
      createdAt: '2024-01-15'
    }
  ]);

  return (
    <MainLayout title="Job Listings">
      <Tabs defaultValue="listings" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="requisitions">Requisitions</TabsTrigger>
          </TabsList>
          <Button onClick={() => navigate('/create-job-listing')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Job Listing
          </Button>
        </div>

        <TabsContent value="listings" className="space-y-4">
          {/* Search, Filter, and View Toggle Bar */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search jobs..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-primary text-white hover:bg-primary/90' : ''}>
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-primary text-white hover:bg-primary/90' : ''}>
                <List className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Job Listings */}
          {viewMode === 'grid' ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map(job => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={job.status === 'published' ? 'default' : 'secondary'}
                    >
                      {job.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                    <div className="text-sm">
                      ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} {job.salary.currency}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Requirements</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside text-gray-600">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t flex items-center justify-between text-sm text-gray-500">
                    <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                    <span>{job.screeningQuestions.length} Screening Questions</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          ) : (
            <div className="space-y-4">
              {jobs.map(job => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between p-6">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <Badge variant={job.status === 'published' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} {job.salary.currency}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Key Requirements: </span>
                        {job.requirements.slice(0, 2).join(', ')}
                        {job.requirements.length > 2 && '...'}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                        <span>{job.screeningQuestions.length} Screening Questions</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="requisitions" className="space-y-4">
          <div className="flex gap-4 items-center mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search requisitions..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {requisitions.map(req => (
              <Card key={req.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        req.status === 'approved' ? 'default' :
                        req.status === 'pending' ? 'secondary' : 'destructive'
                      }
                    >
                      {req.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-xl">{req.id}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{req.department}</span>
                    </div>
                    <div className="text-sm">
                      Manager: {req.managerName}
                    </div>
                  </div>
                  <div className="pt-4 border-t flex items-center justify-between text-sm text-gray-500">
                    <span>Created: {new Date(req.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Create New Requisition</CardTitle>
            </CardHeader>
            <CardContent>
              <RequisitionForm
                onSubmit={(data) => {
                  const newRequisition: Requisition = {
                    id: data.requisitionId || `REQ-${Date.now()}`,
                    department: data.department,
                    managerName: data.managerName,
                    status: 'pending',
                    createdAt: new Date().toISOString().split('T')[0]
                  };
                  setRequisitions(prev => [newRequisition, ...prev]);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default JobListings;