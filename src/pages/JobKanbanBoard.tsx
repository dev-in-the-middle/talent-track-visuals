import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Plus, MoreHorizontal, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Candidate {
  id: string;
  name: string;
  position: string;
  photo?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  date: string;
  status: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  count: number;
  candidates: Candidate[];
}

interface JobListing {
  id: string;
  title: string;
  department: string;
  columns?: KanbanColumn[];
}

const JobKanbanBoard = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  const [jobListings] = useState<JobListing[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      columns: [
        {
          id: 'new',
          title: 'New Applications',
          color: 'bg-gray-200',
          count: 2,
          candidates: [
            {
              id: 'c1',
              name: 'John Doe',
              position: 'Frontend Developer',
              rating: 4,
              tags: ['React', 'TypeScript'],
              date: '2024-04-19',
              status: 'new'
            }
          ]
        },
        {
          id: 'technical',
          title: 'Technical Assessment',
          color: 'bg-blue-200',
          count: 1,
          candidates: []
        }
      ]
    },
    {
      id: '2',
      title: 'Product Manager',
      department: 'Product',
      columns: [
        {
          id: 'new',
          title: 'New Applications',
          color: 'bg-gray-200',
          count: 0,
          candidates: []
        },
        {
          id: 'interview',
          title: 'Interview',
          color: 'bg-purple-200',
          count: 0,
          candidates: []
        }
      ]
    }
  ]);

  const handleJobChange = (selectedJobId: string) => {
    navigate(`/jobs/${selectedJobId}/kanban`);
  };

  const currentJob = jobListings.find(job => job.id === jobId) || jobListings[0];
  const [columns, setColumns] = useState(currentJob?.columns || []);

  useEffect(() => {
    if (currentJob?.columns) {
      setColumns(currentJob.columns);
    }
  }, [currentJob]);

  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  const handleDragStart = (e: React.DragEvent, candidateId: string, sourceColumnId: string) => {
    e.dataTransfer.setData("candidateId", candidateId);
    e.dataTransfer.setData("sourceColumnId", sourceColumnId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    const candidateId = e.dataTransfer.getData("candidateId");
    const sourceColumnId = e.dataTransfer.getData("sourceColumnId");
    
    if (sourceColumnId === targetColumnId) return;

    setColumns(prev => {
      const sourceColumn = prev.find(col => col.id === sourceColumnId);
      if (!sourceColumn) return prev;
      
      const candidateIndex = sourceColumn.candidates.findIndex(c => c.id === candidateId);
      if (candidateIndex === -1) return prev;
      
      const candidate = sourceColumn.candidates[candidateIndex];
      
      return prev.map(col => {
        if (col.id === sourceColumnId) {
          return {
            ...col,
            candidates: col.candidates.filter(c => c.id !== candidateId),
            count: col.count - 1
          };
        }
        if (col.id === targetColumnId) {
          return {
            ...col,
            candidates: [...col.candidates, { ...candidate, status: targetColumnId }],
            count: col.count + 1
          };
        }
        return col;
      });
    });
    
    if (selectedCandidates.includes(candidateId)) {
      setSelectedCandidates(prev => prev.filter(id => id !== candidateId));
    }
  };

  const handleSelect = (candidateId: string) => {
    setSelectedCandidates(prev => {
      if (prev.includes(candidateId)) {
        return prev.filter(id => id !== candidateId);
      } else {
        return [...prev, candidateId];
      }
    });
  };

  const moveSelectedCandidates = (targetColumnId: string) => {
    if (selectedCandidates.length === 0) return;

    setColumns(prev => {
      const candidatesToMove: Record<string, Candidate> = {};
      const sourceColumnIds: Set<string> = new Set();

      prev.forEach(col => {
        col.candidates.forEach(candidate => {
          if (selectedCandidates.includes(candidate.id)) {
            candidatesToMove[candidate.id] = candidate;
            sourceColumnIds.add(col.id);
          }
        });
      });

      return prev.map(col => {
        if (sourceColumnIds.has(col.id) && col.id !== targetColumnId) {
          return {
            ...col,
            candidates: col.candidates.filter(c => !selectedCandidates.includes(c.id)),
            count: col.candidates.length - Object.keys(candidatesToMove).length
          };
        }
        if (col.id === targetColumnId) {
          const newCandidates = [
            ...col.candidates,
            ...Object.values(candidatesToMove).map(c => ({ ...c, status: targetColumnId }))
          ];
          return {
            ...col,
            candidates: newCandidates,
            count: newCandidates.length
          };
        }
        return col;
      });
    });
    
    setSelectedCandidates([]);
  };

  return (
    <MainLayout title={`Job Pipeline - ${currentJob?.title}`}>
      <div className="flex flex-col h-full relative">
        <div className="sticky top-0 z-10 bg-gray-50 flex flex-wrap gap-4 items-center justify-between py-4 px-2 border-b border-gray-200">
          <div className="flex flex-wrap gap-4 items-center">
            <Select value={jobId || jobListings[0].id} onValueChange={handleJobChange}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select job listing" />
              </SelectTrigger>
              <SelectContent>
                {jobListings.map(job => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title} - {job.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search candidates..."
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="sm" className="h-10">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            {selectedCandidates.length > 0 && (
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium">{selectedCandidates.length} selected</span>
                <div className="flex gap-1">
                  {columns.map(column => (
                    <Button 
                      key={column.id}
                      size="sm" 
                      variant="outline" 
                      onClick={() => moveSelectedCandidates(column.id)}
                      className={`px-2 py-1 h-8 ${column.color.replace('bg-', 'hover:bg-').replace('200', '300')} border-none`}
                    >
                      Move to {column.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Candidate
            </Button>
          </div>
        </div>

        <div className="flex-1 min-h-0 mt-4">
          <ScrollArea className="h-full">
            <div className="flex gap-6 min-w-max pb-6">
              {columns.map(column => (
                <div
                  key={column.id}
                  className="w-80 flex-shrink-0"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column.id)}
                >
                  <Card className="h-full">
                    <CardHeader className={`${column.color} rounded-t-lg px-4 py-3`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base font-medium flex items-center">
                            {column.title}
                            <Badge variant="outline" className="ml-2 bg-white">
                              {column.count}
                            </Badge>
                          </CardTitle>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-2">
                      <div className="space-y-2">
                        {column.candidates.map(candidate => (
                          <div
                            key={candidate.id}
                            className={`bg-white rounded-md shadow p-3 cursor-grab 
                                     ${selectedCandidates.includes(candidate.id) ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, candidate.id, column.id)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Checkbox 
                                  checked={selectedCandidates.includes(candidate.id)} 
                                  onCheckedChange={() => handleSelect(candidate.id)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <Avatar className="h-8 w-8">
                                  <div className="bg-purple-500 h-8 w-8 rounded-full flex items-center justify-center text-white font-medium">
                                    {candidate.name.charAt(0)}
                                  </div>
                                </Avatar>
                              </div>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <h3 className="font-medium">{candidate.name}</h3>
                            <p className="text-sm text-gray-500">{candidate.position}</p>
                            
                            <div className="flex gap-1 mt-2">
                              {candidate.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="bg-gray-100 text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                              <div className="flex items-center">
                                <div className="flex">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className={i < candidate.rating ? "text-yellow-400" : "text-gray-300"}>
                                      ★
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <span>Added: {new Date(candidate.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                        
                        {column.candidates.length === 0 && (
                          <div className="flex flex-col items-center justify-center h-24 border border-dashed rounded-md bg-gray-50">
                            <p className="text-sm text-gray-500">Drop candidates here</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobKanbanBoard;
