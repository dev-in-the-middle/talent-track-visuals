
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eye, MoreHorizontal, Search, Filter, FileText, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

// Sample data for candidates
const candidatesData = [
  {
    id: '1',
    name: 'John Doe',
    position: 'Frontend Developer',
    location: 'San Francisco, CA',
    appliedDate: 'Oct 10, 2023',
    status: 'Interview',
    avatar: 'JD'
  },
  {
    id: '2',
    name: 'Sarah Smith',
    position: 'UI/UX Designer',
    location: 'New York, NY',
    appliedDate: 'Oct 9, 2023',
    status: 'Assessment',
    avatar: 'SS'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    position: 'Product Manager',
    location: 'Chicago, IL',
    appliedDate: 'Oct 8, 2023',
    status: 'Applied',
    avatar: 'MJ'
  },
  {
    id: '4',
    name: 'Emily Brown',
    position: 'Backend Developer',
    location: 'Austin, TX',
    appliedDate: 'Oct 7, 2023',
    status: 'Rejected',
    avatar: 'EB'
  },
  {
    id: '5',
    name: 'David Wilson',
    position: 'DevOps Engineer',
    location: 'Seattle, WA',
    appliedDate: 'Oct 6, 2023',
    status: 'Offer',
    avatar: 'DW'
  },
  {
    id: '6',
    name: 'Jennifer Lee',
    position: 'QA Engineer',
    location: 'Boston, MA',
    appliedDate: 'Oct 5, 2023',
    status: 'Applied',
    avatar: 'JL'
  },
  {
    id: '7',
    name: 'Robert Martinez',
    position: 'Data Scientist',
    location: 'Denver, CO',
    appliedDate: 'Oct 4, 2023',
    status: 'Assessment',
    avatar: 'RM'
  },
  {
    id: '8',
    name: 'Amanda Garcia',
    position: 'Project Manager',
    location: 'Miami, FL',
    appliedDate: 'Oct 3, 2023',
    status: 'Interview',
    avatar: 'AG'
  },
];

// Badge component for status
const StatusBadge = ({ status }: { status: string }) => {
  let color;
  
  switch (status) {
    case "Interview":
      color = "bg-blue-100 text-blue-800";
      break;
    case "Assessment":
      color = "bg-yellow-100 text-yellow-800";
      break;
    case "Applied":
      color = "bg-purple-100 text-purple-800";
      break;
    case "Rejected":
      color = "bg-red-100 text-red-800";
      break;
    case "Offer":
      color = "bg-green-100 text-green-800";
      break;
    default:
      color = "bg-gray-100 text-gray-800";
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {status}
    </span>
  );
};

const Candidates = () => {
  const [candidates, setCandidates] = useState(candidatesData);
  
  return (
    <MainLayout title="All Candidates">
      <div className="space-y-6 animate-fade-in">
        {/* Filters and search bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-1 w-full md:w-auto items-center relative">
            <Search className="absolute left-3 text-gray-400" size={18} />
            <Input 
              placeholder="Search candidates..." 
              className="pl-10 pr-4 w-full"
            />
          </div>
          
          <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
            <div className="flex gap-2 w-full md:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="assessment">Assessment</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
            </div>
            
            <Button className="w-full md:w-auto">
              <UserPlus className="mr-2" size={18} />
              Add Candidate
            </Button>
          </div>
        </div>
        
        {/* Candidates table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                        <span className="text-sm font-medium">{candidate.avatar}</span>
                      </div>
                      <Link to={`/candidates/${candidate.id}`} className="font-medium text-blue-600 hover:underline">
                        {candidate.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>{candidate.position}</TableCell>
                  <TableCell>{candidate.location}</TableCell>
                  <TableCell>{candidate.appliedDate}</TableCell>
                  <TableCell>
                    <StatusBadge status={candidate.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/candidates/${candidate.id}`}>
                          <Eye size={16} />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/resumes/${candidate.id}`}>
                          <FileText size={16} />
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Candidates;
