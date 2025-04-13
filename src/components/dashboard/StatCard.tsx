
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  className?: string;
}

const StatCard = ({ title, value, change, isPositive, icon, className }: StatCardProps) => {
  return (
    <div className={cn("dashboard-card p-6", className)}>
      <div className="flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="dashboard-stat mt-1">{value}</p>
          
          {change && (
            <div className="flex items-center mt-2">
              <span 
                className={cn(
                  "text-sm font-medium",
                  isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {isPositive ? '↑' : '↓'} {change}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
