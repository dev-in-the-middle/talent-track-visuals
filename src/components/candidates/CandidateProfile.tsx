
import { useState } from 'react';
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Star,
  User,
  Edit,
  Paperclip,
  MessageSquare,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CandidateProfileProps {
  id: string;
}

const CandidateProfile = ({ id }: CandidateProfileProps) => {
  // Mock data for candidate
  const candidate = {
    id,
    name: 'John Doe',
    position: 'Senior Frontend Developer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    appliedDate: 'October 10, 2023',
    stage: 'Interview',
    experience: '8 years',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Redux'],
    rating: 4.5,
    avatar: 'JD',
    bio: 'Experienced frontend developer with a passion for creating intuitive user interfaces. Skilled in modern JavaScript frameworks, responsive design, and performance optimization.',
    education: [
      {
        id: 1,
        degree: 'M.S. Computer Science',
        school: 'Stanford University',
        year: '2015 - 2017'
      },
      {
        id: 2,
        degree: 'B.S. Computer Science',
        school: 'University of California, Berkeley',
        year: '2011 - 2015'
      }
    ],
    workHistory: [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'Tech Innovations Inc.',
        period: 'Jan 2020 - Present',
        description: 'Lead frontend development for multiple projects, implemented design systems, and improved application performance.'
      },
      {
        id: 2,
        title: 'Frontend Developer',
        company: 'Digital Solutions LLC',
        period: 'Mar 2017 - Dec 2019',
        description: 'Developed responsive web applications using React and maintained existing JavaScript codebase.'
      },
      {
        id: 3,
        title: 'Junior Developer',
        company: 'WebStart Agency',
        period: 'Jun 2015 - Feb 2017',
        description: 'Assisted in developing websites and applications for various clients using HTML, CSS, and JavaScript.'
      }
    ],
    interviews: [
      {
        id: 1,
        type: 'Phone Screen',
        interviewer: 'Sarah Johnson',
        date: 'Oct 15, 2023',
        time: '2:00 PM',
        status: 'Completed',
        feedback: 'Strong communication skills and technical knowledge. Recommend moving forward.'
      },
      {
        id: 2,
        type: 'Technical Interview',
        interviewer: 'Michael Chen',
        date: 'Oct 20, 2023',
        time: '11:00 AM',
        status: 'Scheduled',
        feedback: ''
      }
    ],
    notes: [
      {
        id: 1,
        author: 'Sarah Johnson',
        date: 'Oct 15, 2023',
        content: 'Candidate demonstrated extensive knowledge of React hooks and state management strategies.'
      },
      {
        id: 2,
        author: 'David Wilson',
        date: 'Oct 16, 2023',
        content: 'Follow up on project experience with GraphQL implementations.'
      }
    ]
  };

  // State for star rating
  const [rating, setRating] = useState(candidate.rating);
  
  return (
    <div className="animate-fade-in">
      {/* Header with candidate info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex">
            <div className="h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-medium mr-4">
              {candidate.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">{candidate.name}</h1>
              <p className="text-gray-600">{candidate.position}</p>
              <div className="mt-2 flex items-center">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mr-2">
                  {candidate.stage}
                </Badge>
                <span className="text-gray-500 text-sm">Applied {candidate.appliedDate}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline">Reject</Button>
            <Button>Move to Next Stage</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center">
            <Mail className="text-gray-500 mr-2" size={18} />
            <span className="text-gray-800">{candidate.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="text-gray-500 mr-2" size={18} />
            <span className="text-gray-800">{candidate.phone}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="text-gray-500 mr-2" size={18} />
            <span className="text-gray-800">{candidate.location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="text-gray-500 mr-2" size={18} />
            <span className="text-gray-800">{candidate.experience} experience</span>
          </div>
        </div>
      </div>
      
      {/* Content tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-5 bg-gray-100">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{candidate.bio}</p>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {candidate.workHistory.map((job) => (
                      <div key={job.id} className="border-l-2 border-gray-200 pl-4 relative">
                        <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[7px] top-1"></div>
                        <h3 className="font-medium text-gray-800">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
                        <p className="text-sm text-gray-500">{job.period}</p>
                        <p className="mt-2 text-gray-700">{job.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidate.education.map((edu) => (
                      <div key={edu.id} className="border-l-2 border-gray-200 pl-4 relative">
                        <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[7px] top-1"></div>
                        <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.school}</p>
                        <p className="text-sm text-gray-500">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Candidate Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <TooltipProvider key={star}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button 
                                onClick={() => setRating(star)} 
                                className="focus:outline-none"
                              >
                                <Star 
                                  size={24} 
                                  className={`${star <= rating 
                                    ? 'text-yellow-400 fill-yellow-400' 
                                    : 'text-gray-300'}`} 
                                />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Rate {star} stars</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-700 font-medium">{rating}/5</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2" size={16} />
                    Send Email
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2" size={16} />
                    Schedule Interview
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="mr-2" size={16} />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Resume Tab */}
        <TabsContent value="resume" className="mt-4 animate-fade-in">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Resume</CardTitle>
                <CardDescription>Uploaded on October 10, 2023</CardDescription>
              </div>
              <Button variant="outline">
                <FileText className="mr-2" size={16} />
                Download
              </Button>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-gray-50 text-center h-[600px] flex flex-col items-center justify-center">
                <FileText size={48} className="text-gray-400" />
                <p className="mt-4 text-gray-600">Resume preview would appear here</p>
                <p className="text-sm text-gray-500 mt-2">PDF and document viewer integration</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Interviews Tab */}
        <TabsContent value="interviews" className="mt-4 animate-fade-in">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Scheduled Interviews</CardTitle>
              <Button>
                <Calendar className="mr-2" size={16} />
                Schedule New
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidate.interviews.map((interview) => (
                  <div key={interview.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800">{interview.type}</h3>
                        <p className="text-gray-600">Interviewer: {interview.interviewer}</p>
                      </div>
                      <Badge 
                        variant={interview.status === 'Completed' ? 'default' : 'outline'}
                        className={interview.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'}
                      >
                        {interview.status}
                      </Badge>
                    </div>
                    
                    <div className="mt-2 flex items-center text-gray-600">
                      <Calendar className="mr-1" size={14} />
                      <span className="text-sm">{interview.date}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm">{interview.time}</span>
                    </div>
                    
                    {interview.feedback && (
                      <div className="mt-3 border-t pt-3">
                        <p className="text-sm font-medium text-gray-700">Feedback:</p>
                        <p className="text-sm text-gray-600">{interview.feedback}</p>
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-end space-x-2">
                      {interview.status !== 'Completed' && (
                        <>
                          <Button variant="outline" size="sm">Reschedule</Button>
                          <Button size="sm">Complete</Button>
                        </>
                      )}
                      {interview.status === 'Completed' && !interview.feedback && (
                        <Button size="sm">Add Feedback</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notes Tab */}
        <TabsContent value="notes" className="mt-4 animate-fade-in">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Candidate Notes</CardTitle>
              <Button>
                <MessageSquare className="mr-2" size={16} />
                Add Note
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidate.notes.map((note) => (
                  <div key={note.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="text-gray-500 mr-2" size={16} />
                        <span className="font-medium text-gray-700">{note.author}</span>
                      </div>
                      <span className="text-sm text-gray-500">{note.date}</span>
                    </div>
                    <p className="mt-2 text-gray-700">{note.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Documents Tab */}
        <TabsContent value="documents" className="mt-4 animate-fade-in">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Documents</CardTitle>
              <Button>
                <Paperclip className="mr-2" size={16} />
                Upload Document
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="text-purple-600 mr-3" size={24} />
                    <div>
                      <p className="font-medium text-gray-800">Resume.pdf</p>
                      <p className="text-sm text-gray-500">Uploaded on Oct 10, 2023</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <FileText size={18} />
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="text-purple-600 mr-3" size={24} />
                    <div>
                      <p className="font-medium text-gray-800">Cover_Letter.pdf</p>
                      <p className="text-sm text-gray-500">Uploaded on Oct 10, 2023</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <FileText size={18} />
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="text-purple-600 mr-3" size={24} />
                    <div>
                      <p className="font-medium text-gray-800">Portfolio.pdf</p>
                      <p className="text-sm text-gray-500">Uploaded on Oct 11, 2023</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <FileText size={18} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CandidateProfile;
