
import { PureComponent } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';

// Sample data for recruitment sources
const data = [
  { name: 'LinkedIn', value: 45 },
  { name: 'Company Website', value: 25 },
  { name: 'Referrals', value: 15 },
  { name: 'Job Boards', value: 10 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

class SourcesChart extends PureComponent {
  render() {
    return (
      <div className="dashboard-card h-full">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Application Sources</h3>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default SourcesChart;
