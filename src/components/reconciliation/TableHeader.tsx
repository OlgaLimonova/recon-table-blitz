
import React from "react";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface TableHeaderProps {
  requestSort: (key: string) => void;
  sortConfig: { key: string; direction: 'ascending' | 'descending' | null };
  allSelected: boolean;
  onToggleSelectAll: () => void;
  indeterminate: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  requestSort,
  sortConfig,
  allSelected,
  onToggleSelectAll,
  indeterminate,
}) => {
  const getSortIndicator = (key: string) => {
    if (sortConfig.key !== key) return null;

    return sortConfig.direction === 'ascending'
      ? <span className="ml-1">↑</span>
      : sortConfig.direction === 'descending'
        ? <span className="ml-1">↓</span>
        : null;
  };

  return (
    <thead className="bg-gray-50 sticky top-0">
      <tr>
        <th
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
          onClick={() => requestSort('auctionHouse')}
        >
          <div className="flex items-center">
            Auction House
            <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </th>
        <th
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
          onClick={() => requestSort('account')}
        >
          <div className="flex items-center">
            Account
            <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </th>
        <th
          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
          onClick={() => requestSort('total')}
        >
          <div className="flex items-center justify-end">
            Total {getSortIndicator('total')}
          </div>
        </th>
        <th
          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
          onClick={() => requestSort('payments')}
        >
          <div className="flex items-center justify-end">
            Payments {getSortIndicator('payments')}
          </div>
        </th>
        <th
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
          onClick={() => requestSort('status')}
        >
          <div className="flex items-center">
            Status {getSortIndicator('status')}
          </div>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
          <div className="flex items-center justify-end">
            <Checkbox
              checked={allSelected}
              indeterminate={indeterminate}
              onCheckedChange={onToggleSelectAll}
              aria-label="Select all visible rows"
            />
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
