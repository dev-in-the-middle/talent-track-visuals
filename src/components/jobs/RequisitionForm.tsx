import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface RequisitionFormProps {
  onSubmit?: (data: RequisitionData) => void;
}

interface RequisitionData {
  department: string;
  managerName: string;
  requisitionId?: string;
}

const generateShareableLink = (requisitionId: string) => {
  // In a real app, this would be your deployed domain
  const baseUrl = window.location.origin;
  return `${baseUrl}/jobs/create/${requisitionId}`;
};

const RequisitionForm = ({ onSubmit }: RequisitionFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<RequisitionData>({
    department: '',
    managerName: '',
  });
  const [shareableLink, setShareableLink] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a unique ID for the requisition
    const requisitionId = `REQ-${Date.now()}`;
    const newRequisition = { ...formData, requisitionId };
    
    // Generate shareable link
    const link = generateShareableLink(requisitionId);
    setShareableLink(link);
    
    // Copy link to clipboard
    navigator.clipboard.writeText(link).then(() => {
      toast({
        title: 'Link copied to clipboard',
        description: 'You can now share this link with the hiring manager',
      });
    });

    if (onSubmit) {
      onSubmit(newRequisition);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Job Requisition</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="e.g. Engineering"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="managerName">Hiring Manager Name</Label>
            <Input
              id="managerName"
              value={formData.managerName}
              onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
              placeholder="e.g. John Doe"
              required
            />
          </div>

          {shareableLink ? (
            <div className="space-y-2">
              <Label>Shareable Link</Label>
              <div className="flex gap-2">
                <Input value={shareableLink} readOnly />
                <Button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(shareableLink);
                    toast({
                      title: 'Link copied',
                      description: 'The link has been copied to your clipboard',
                    });
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          ) : (
            <Button type="submit" className="w-full">
              Generate Shareable Link
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default RequisitionForm;