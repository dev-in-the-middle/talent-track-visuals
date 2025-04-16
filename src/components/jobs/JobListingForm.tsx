import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface JobListingFormProps {
  requisitionId?: string;
  onSubmit?: (data: JobListingData) => void;
}

interface JobListingData {
  title: string;
  department: string;
  location: string;
  type: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  screeningQuestions: {
    question: string;
    type: 'text' | 'choice' | 'boolean';
    required: boolean;
  }[];
}

const JobListingForm = ({ requisitionId, onSubmit }: JobListingFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<JobListingData>({
    title: '',
    department: '',
    location: '',
    type: '',
    salary: {
      min: 0,
      max: 0,
      currency: 'USD'
    },
    description: '',
    requirements: [''],
    screeningQuestions: [{
      question: '',
      type: 'text',
      required: true
    }]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSubmit) {
      onSubmit(formData);
    }

    toast({
      title: 'Job listing created',
      description: 'The job listing has been created successfully',
    });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, '']
    });
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({
      ...formData,
      requirements: newRequirements
    });
  };

  const addScreeningQuestion = () => {
    setFormData({
      ...formData,
      screeningQuestions: [...formData.screeningQuestions, {
        question: '',
        type: 'text',
        required: true
      }]
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Job Listing {requisitionId && `(Requisition: ${requisitionId})`}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Senior Frontend Developer"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Remote, New York, etc."
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Employment Type</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="e.g. Full-time"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryMin">Salary Min</Label>
                <Input
                  id="salaryMin"
                  type="number"
                  value={formData.salary.min || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    salary: { ...formData.salary, min: Number(e.target.value) }
                  })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryMax">Salary Max</Label>
                <Input
                  id="salaryMax"
                  type="number"
                  value={formData.salary.max || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    salary: { ...formData.salary, max: Number(e.target.value) }
                  })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[150px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Requirements</Label>
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder={`Requirement ${index + 1}`}
                    required
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addRequirement}
                className="mt-2"
              >
                Add Requirement
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Screening Questions</Label>
              {formData.screeningQuestions.map((q, index) => (
                <div key={index} className="space-y-2">
                  <Input
                    value={q.question}
                    onChange={(e) => {
                      const newQuestions = [...formData.screeningQuestions];
                      newQuestions[index] = { ...q, question: e.target.value };
                      setFormData({ ...formData, screeningQuestions: newQuestions });
                    }}
                    placeholder={`Question ${index + 1}`}
                    required
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addScreeningQuestion}
                className="mt-2"
              >
                Add Screening Question
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Create Job Listing
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobListingForm;