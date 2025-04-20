
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useReconciliationData } from "@/hooks/useReconciliationData";
import ReconciliationFilters from "./reconciliation/ReconciliationFilters";
import TableHeader from "./reconciliation/TableHeader";
import TableRow from "./reconciliation/TableRow";
import TableActions from "./reconciliation/TableActions";

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
      
      <TableActions 
        selectedRows={selectedRows}
        filteredData={filteredData}
        onClearSelection={toggleSelectAll}
      />
      
      <div className="border rounded-md overflow-auto max-h-[600px]">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader 
            requestSort={requestSort}
            sortConfig={sortConfig}
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? filteredData.map((record) => (
              <TableRow
                key={record.id}
                record={record}
                isSelected={selectedRows.includes(record.id)}
                onToggleSelection={toggleRowSelection}
                formatNumber={formatNumber}
              />
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
