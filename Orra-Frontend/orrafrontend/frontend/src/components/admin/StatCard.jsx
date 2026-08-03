import { Card, CardContent } from "@/components/ui/card";

const StatCard = ({ label, value, change }) => {
 return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <span className="text-sm text-gray-500">{label}</span>
          {change && <span className="text-xs text-green-600">{change}</span>}
        </div>
        <div className="text-2xl font-semibold mt-1">{value}</div>
      </CardContent>
    </Card>
  );
}

export default StatCard