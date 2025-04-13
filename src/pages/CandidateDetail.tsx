
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import CandidateProfile from '@/components/candidates/CandidateProfile';

const CandidateDetail = () => {
  const { id = '1' } = useParams<{ id: string }>();
  
  return (
    <MainLayout title="Candidate Profile">
      <CandidateProfile id={id} />
    </MainLayout>
  );
};

export default CandidateDetail;
