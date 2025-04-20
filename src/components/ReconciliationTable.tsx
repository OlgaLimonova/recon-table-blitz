import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpDown, X } from "lucide-react";
import ReconciliationFilters from "./reconciliation/ReconciliationFilters";
import { useReconciliationData } from "@/hooks/useReconciliationData";
import { exportToCSV } from "@/utils/exportUtils";

const formatNumber = (num: number) => {
  return num.toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .replace(".", ",");
};

const ReconciliationTable: React.FC = () => {
  const [auctionHouseFilter, setAuctionHouseFilter] = useState("");
  const [accountFilter, setAccountFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' | null }>({
    key: '',
    direction: null
  });

  const {
    filteredData,
    selectedRows,
    selectAll,
    toggleRowSelection,
    toggleSelectAll,
    selectAllRows,
  } = useReconciliationData(auctionHouseFilter, accountFilter, statusFilter, sortConfig);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }
    
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: string) => {
    if (sortConfig.key !== key) return null;
    
    return sortConfig.direction === 'ascending' 
      ? <span className="ml-1">↑</span> 
      : sortConfig.direction === 'descending' 
        ? <span className="ml-1">↓</span> 
        : null;
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Account Reconciliation</h1>
      
      <ReconciliationFilters
        auctionHouseFilter={auctionHouseFilter}
        setAuctionHouseFilter={setAuctionHouseFilter}
        accountFilter={accountFilter}
        setAccountFilter={setAccountFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      <div className="flex justify-between items-center mb-4">
        <div>
          {selectedRows.length > 0 && (
            <span className="text-sm font-medium">
              {selectedRows.length} {selectedRows.length === 1 ? 'row' : 'rows'} selected
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline"
            onClick={toggleSelectAll}
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
      
      <div className="border rounded-md overflow-auto max-h-[600px]">
        <table className="min-w-full divide-y divide-gray-200">
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
                    checked={selectAll}
                    onCheckedChange={selectAllRows}
                    aria-label="Select all rows"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? filteredData.map((record) => (
              <tr key={record.id} className={cn(
                "hover:bg-gray-50", 
                selectedRows.includes(record.id) ? "bg-blue-50" : ""
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
                  <Badge variant="destructive">
                    {record.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-end">
                    <Checkbox 
                      checked={selectedRows.includes(record.id)}
                      onCheckedChange={() => toggleRowSelection(record.id)}
                      aria-label={`Select row ${record.id}`}
                    />
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReconciliationTable;
