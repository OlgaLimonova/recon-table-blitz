
import { Card, CardContent } from "@/components/ui/card";
import ReconciliationTable from "@/components/ReconciliationTable";
import { useReconciliationData } from "@/hooks/useReconciliationData";
import { CircleAlert } from "lucide-react";

const Index = () => {
  const { filteredData } = useReconciliationData("", "", "All", { key: "", direction: null });
  const unmatchedCount = filteredData.filter(item => item.status === "Unmatched").length;
  const totalCount = filteredData.length; // This will now correctly reflect 375 items
  const matchedPercentage = Math.round((totalCount - unmatchedCount) / totalCount * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <Card className="mb-8 w-full">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-lg">
                  <CircleAlert className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Unmatched Items</h3>
                  <p className="text-sm text-gray-500">Items requiring attention</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-red-600">{unmatchedCount}</span>
                <p className="text-sm text-gray-500">out of {totalCount} total items</p>
                <p className="text-sm text-green-600">{matchedPercentage}% matched</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <ReconciliationTable />
      </div>
    </div>
  );
};

export default Index;

