
import { PureComponent } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample data for the chart
const data = [
  { name: 'Mon', applications: 12, interviews: 6, hires: 1 },
  { name: 'Tue', applications: 19, interviews: 8, hires: 2 },
  { name: 'Wed', applications: 15, interviews: 10, hires: 3 },
  { name: 'Thu', applications: 22, interviews: 12, hires: 2 },
  { name: 'Fri', applications: 28, interviews: 14, hires: 4 },
  { name: 'Sat', applications: 10, interviews: 5, hires: 1 },
  { name: 'Sun', applications: 8, interviews: 3, hires: 0 },
];

interface ApplicantsChartProps {
  title: string;
}

class ApplicantsChart extends PureComponent<ApplicantsChartProps> {
  render() {
    const { title } = this.props;
    
    return (
      <div className="dashboard-card h-full">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">{title}</h3>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="applications" 
                stroke="#8B5CF6" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="interviews" 
                stroke="#3B82F6" 
                strokeWidth={2} 
              />
              <Line 
                type="monotone" 
                dataKey="hires" 
                stroke="#10B981" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default ApplicantsChart;
