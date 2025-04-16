
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Plus, MoreHorizontal, UserPlus, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

// Types for our data
interface Candidate {
  id: string;
  name: string;
  position: string;
  photo?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  date: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  count: number;
  candidates: Candidate[];
}

const KanbanBoard = () => {
  // Sample data for the board
  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: 'applied',
      title: 'Applied',
      color: 'bg-gray-200',
      count: 24,
      candidates: [
        {
          id: '1',
          name: 'Emma Johnson',
          position: 'Frontend Developer',
          rating: 4,
          tags: ['JavaScript', 'React'],
          date: '2023-04-12'
        },
        {
          id: '2',
          name: 'Michael Chen',
          position: 'UX Designer',
          rating: 5,
          tags: ['Figma', 'UI/UX'],
          date: '2023-04-11'
        },
        {
          id: '3',
          name: 'Alex Rodriguez',
          position: 'Product Manager',
          rating: 3,
          tags: ['Agile', 'SaaS'],
          date: '2023-04-10'
        }
      ]
    },
    {
      id: 'screening',
      title: 'Screening',
      color: 'bg-blue-200',
      count: 12,
      candidates: [
        {
          id: '4',
          name: 'Sarah Williams',
          position: 'Backend Developer',
          rating: 4,
          tags: ['Python', 'Django'],
          date: '2023-04-08'
        },
        {
          id: '5',
          name: 'David Kim',
          position: 'DevOps Engineer',
          rating: 5,
          tags: ['AWS', 'Docker'],
          date: '2023-04-07'
        }
      ]
    },
    {
      id: 'interview',
      title: 'Interview',
      color: 'bg-purple-200',
      count: 8,
      candidates: [
        {
          id: '6',
          name: 'Jessica Brown',
          position: 'Full Stack Developer',
          rating: 5,
          tags: ['React', 'Node.js'],
          date: '2023-04-05'
        },
        {
          id: '7',
          name: 'Ryan Lee',
          position: 'Mobile Developer',
          rating: 4,
          tags: ['React Native', 'iOS'],
          date: '2023-04-04'
        }
      ]
    },
    {
      id: 'offer',
      title: 'Offer',
      color: 'bg-yellow-200',
      count: 4,
      candidates: [
        {
          id: '8',
          name: 'Amanda Martinez',
          position: 'Data Scientist',
          rating: 5,
          tags: ['Python', 'ML'],
          date: '2023-04-02'
        }
      ]
    },
    {
      id: 'hired',
      title: 'Hired',
      color: 'bg-green-200',
      count: 5,
      candidates: [
        {
          id: '9',
          name: 'John Smith',
          position: 'Marketing Manager',
          rating: 5,
          tags: ['SEO', 'Content'],
          date: '2023-03-28'
        }
      ]
    }
  ]);

  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, candidateId: string, sourceColumnId: string) => {
    e.dataTransfer.setData("candidateId", candidateId);
    e.dataTransfer.setData("sourceColumnId", sourceColumnId);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    const candidateId = e.dataTransfer.getData("candidateId");
    const sourceColumnId = e.dataTransfer.getData("sourceColumnId");
    
    if (sourceColumnId === targetColumnId) return;

    setColumns(prev => {
      // Find the candidate in the source column
      const sourceColumn = prev.find(col => col.id === sourceColumnId);
      if (!sourceColumn) return prev;
      
      const candidateIndex = sourceColumn.candidates.findIndex(c => c.id === candidateId);
      if (candidateIndex === -1) return prev;
      
      const candidate = sourceColumn.candidates[candidateIndex];
      
      // Create a new array with the candidate removed from the source column
      const newColumns = prev.map(col => {
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
            candidates: [...col.candidates, candidate],
            count: col.count + 1
          };
        }
        return col;
      });
      
      return newColumns;
    });
    
    // Clear selection if the candidate was selected
    if (selectedCandidates.includes(candidateId)) {
      setSelectedCandidates(prev => prev.filter(id => id !== candidateId));
    }
  };

  // Handle checkbox selection
  const handleSelect = (candidateId: string) => {
    setSelectedCandidates(prev => {
      if (prev.includes(candidateId)) {
        return prev.filter(id => id !== candidateId);
      } else {
        return [...prev, candidateId];
      }
    });
  };

  // Move selected candidates to a target column
  const moveSelectedCandidates = (targetColumnId: string) => {
    if (selectedCandidates.length === 0) return;

    setColumns(prev => {
      // Create a map of candidates to move and their source columns
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

      // Create a new array with the candidates moved to the target column
      const newColumns = prev.map(col => {
        if (sourceColumnIds.has(col.id) && col.id !== targetColumnId) {
          // Remove selected candidates from this column
          const remainingCandidates = col.candidates.filter(
            c => !selectedCandidates.includes(c.id)
          );
          return {
            ...col,
            candidates: remainingCandidates,
            count: remainingCandidates.length
          };
        }
        if (col.id === targetColumnId) {
          // Add candidates to the target column (avoiding duplicates)
          const existingIds = new Set(col.candidates.map(c => c.id));
          const newCandidates = [
            ...col.candidates,
            ...Object.values(candidatesToMove).filter(c => !existingIds.has(c.id))
          ];
          return {
            ...col,
            candidates: newCandidates,
            count: newCandidates.length
          };
        }
        return col;
      });
      
      return newColumns;
    });
    
    // Clear selection
    setSelectedCandidates([]);
  };

  return (
    <MainLayout title="Kanban Board">
      <div className="flex flex-col h-full relative">
        {/* Header actions - fixed */}
        <div className="sticky top-0 z-10 bg-gray-50 flex flex-wrap gap-4 items-center justify-between py-4 px-2 border-b border-gray-200">
          <div className="flex flex-wrap gap-2 items-center">
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

        {/* Kanban board - scrollable */}
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
                                {/* Star rating */}
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

export default KanbanBoard;
