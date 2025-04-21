
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { exportToCSV } from "@/utils/exportUtils";
import { ReconciliationRecord } from "@/types/reconciliation";

interface TableActionsProps {
  selectedRows: number[];
  filteredData: ReconciliationRecord[];
  onClearSelection: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({ 
  selectedRows, 
  filteredData, 
  onClearSelection 
}) => {
  return (
    <div className="flex justify-end items-center mb-4">
      <div className="flex items-center space-x-4">
        {selectedRows.length > 0 && (
          <span className="text-sm font-medium">
            {selectedRows.length} {selectedRows.length === 1 ? 'row' : 'rows'} selected
          </span>
        )}
        <Button 
          variant="outline"
          onClick={onClearSelection}
          disabled={selectedRows.length === 0}
          className="flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Clear all
        </Button>
        <Button 
          onClick={() => exportToCSV(selectedRows, filteredData)} 
          disabled={selectedRows.length === 0}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Export to Excel
        </Button>
      </div>
    </div>
  );
};

export default TableActions;

