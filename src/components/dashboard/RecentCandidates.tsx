
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, FileText, ThumbsUp, ThumbsDown } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data for recent candidates
const recentCandidates = [
  {
    id: 1,
    name: "John Doe",
    position: "Frontend Developer",
    date: "Today",
    status: "Interview",
    avatar: "JD"
  },
  {
    id: 2,
    name: "Sarah Smith",
    position: "UI/UX Designer",
    date: "Yesterday",
    status: "Assessment",
    avatar: "SS"
  },
  {
    id: 3,
    name: "Michael Johnson",
    position: "Product Manager",
    date: "Oct 12",
    status: "Applied",
    avatar: "MJ"
  },
  {
    id: 4,
    name: "Emily Brown",
    position: "Backend Developer",
    date: "Oct 10",
    status: "Rejected",
    avatar: "EB"
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
    default:
      color = "bg-gray-100 text-gray-800";
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {status}
    </span>
  );
};

const RecentCandidates = () => {
  return (
    <div className="dashboard-card h-full flex flex-col">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-medium text-gray-700">Recent Candidates</h3>
        <Button variant="outline" size="sm" asChild>
          <Link to="/candidates">View All</Link>
        </Button>
      </div>
      
      <div className="flex-1 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Candidate</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
                      <span className="text-sm font-medium">{candidate.avatar}</span>
                    </div>
                    <span className="font-medium">{candidate.name}</span>
                  </div>
                </TableCell>
                <TableCell>{candidate.position}</TableCell>
                <TableCell>{candidate.date}</TableCell>
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
                    <Button variant="ghost" size="icon">
                      <ThumbsUp size={16} className="text-green-600" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ThumbsDown size={16} className="text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecentCandidates;
