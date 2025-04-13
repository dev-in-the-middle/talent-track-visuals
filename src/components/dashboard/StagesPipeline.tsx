
import { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Sample data for recruitment pipeline
const data = [
  { name: 'Applied', candidates: 120 },
  { name: 'Resume Screened', candidates: 85 },
  { name: 'Phone Screen', candidates: 60 },
  { name: 'Interview', candidates: 45 },
  { name: 'Assessment', candidates: 30 },
  { name: 'Offer', candidates: 18 },
  { name: 'Hired', candidates: 12 },
];

class StagesPipeline extends PureComponent {
  render() {
    return (
      <div className="dashboard-card h-full">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Recruitment Pipeline</h3>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="candidates" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default StagesPipeline;
