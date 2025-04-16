import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import JobListingForm from '@/components/jobs/JobListingForm';

const CreateJobListing = () => {
  const { requisitionId } = useParams();

  return (
    <MainLayout title="Create Job Listing">
      <div className="max-w-4xl mx-auto">
        <JobListingForm
          requisitionId={requisitionId}
          onSubmit={(data) => {
            // In a real app, this would save to a database
            console.log('Job listing created:', data);
          }}
        />
      </div>
    </MainLayout>
  );
};

export default CreateJobListing;