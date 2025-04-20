
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ReconciliationRecord } from "@/types/reconciliation";

interface TableRowProps {
  record: ReconciliationRecord;
  isSelected: boolean;
  onToggleSelection: (id: number) => void;
  formatNumber: (num: number) => string;
}

const TableRow: React.FC<TableRowProps> = ({ 
  record, 
  isSelected, 
  onToggleSelection,
  formatNumber 
}) => {
  return (
    <tr className={cn(
      "hover:bg-gray-50", 
      isSelected ? "bg-blue-50" : ""
    )}>
      <td className="px-6 py-4 whitespace-nowrap">
        {record.auctionHouse}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {record.account}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        {formatNumber(record.total)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        {formatNumber(record.payments)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge 
          variant={record.status === "Matched" ? "matched" : "destructive"}
        >
          {record.status}
        </Badge>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex justify-end">
          <Checkbox 
            checked={isSelected}
            onCheckedChange={() => onToggleSelection(record.id)}
            aria-label={`Select row ${record.id}`}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
