
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Define types for our data
interface ReconciliationRecord {
  id: number;
  auctionHouse: string;
  account: string;
  total: number;
  payments: number;
  status: "Matched" | "Unmatched";
}

const ReconciliationTable: React.FC = () => {
  // Sample data
  const sampleData: ReconciliationRecord[] = [
    { id: 1, auctionHouse: "House A", account: "10001", total: 15000.00, payments: 15000.00, status: "Matched" },
    { id: 2, auctionHouse: "House B", account: "10001", total: 7500.50, payments: 7350.50, status: "Unmatched" },
    { id: 3, auctionHouse: "House C", account: "10002", total: 12400.75, payments: 12400.75, status: "Matched" },
    { id: 4, auctionHouse: "House A", account: "10003", total: 9200.25, payments: 9050.00, status: "Unmatched" },
    { id: 5, auctionHouse: "House D", account: "10002", total: 6300.00, payments: 6300.00, status: "Matched" },
    { id: 6, auctionHouse: "House E", account: "10004", total: 22150.80, payments: 22000.00, status: "Unmatched" },
    { id: 7, auctionHouse: "House F", account: "10003", total: 8750.45, payments: 8750.45, status: "Matched" },
    { id: 8, auctionHouse: "House B", account: "10005", total: 14300.20, payments: 14300.20, status: "Matched" },
    { id: 9, auctionHouse: "House C", account: "10004", total: 18600.35, payments: 18200.35, status: "Unmatched" },
    { id: 10, auctionHouse: "House F", account: "10005", total: 5400.90, payments: 5400.90, status: "Matched" },
    { id: 11, auctionHouse: "House A", account: "10001", total: 11250.60, payments: 11000.60, status: "Unmatched" },
    { id: 12, auctionHouse: "House D", account: "10003", total: 7900.30, payments: 7900.30, status: "Matched" },
    { id: 13, auctionHouse: "House E", account: "10002", total: 16800.15, payments: 16800.15, status: "Matched" },
    { id: 14, auctionHouse: "House B", account: "10004", total: 9450.75, payments: 9200.75, status: "Unmatched" },
    { id: 15, auctionHouse: "House F", account: "10001", total: 13700.40, payments: 13700.40, status: "Matched" },
  ];

  // Filter options
  const auctionHouses = ["House A", "House B", "House C", "House D", "House E", "House F"];
  const accountNumbers = ["10001", "10002", "10003", "10004", "10005"];
  const statusOptions = ["All", "Matched", "Unmatched"];

  // State management
  const [data, setData] = useState<ReconciliationRecord[]>(sampleData);
  const [filteredData, setFilteredData] = useState<ReconciliationRecord[]>(sampleData);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' | null }>({
    key: '',
    direction: null
  });

  // Filters
  const [auctionHouseFilter, setAuctionHouseFilter] = useState("");
  const [accountFilter, setAccountFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Apply filters and sort
  useEffect(() => {
    let filtered = [...data];

    // Apply auction house filter
    if (auctionHouseFilter) {
      filtered = filtered.filter(record => 
        record.auctionHouse.toLowerCase().includes(auctionHouseFilter.toLowerCase())
      );
    }

    // Apply account filter
    if (accountFilter) {
      filtered = filtered.filter(record => 
        record.account.includes(accountFilter)
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter(record => record.status === statusFilter);
    }

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof ReconciliationRecord];
        const bValue = b[sortConfig.key as keyof ReconciliationRecord];

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredData(filtered);
    
    // Reset selection when filters change
    setSelectedRows([]);
    setSelectAll(false);
  }, [data, auctionHouseFilter, accountFilter, statusFilter, sortConfig]);

  // Handle sorting
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

  // Handle row selection
  const toggleRowSelection = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
      setSelectAll(false);
    } else {
      setSelectedRows([...selectedRows, id]);
      if (selectedRows.length + 1 === filteredData.length) {
        setSelectAll(true);
      }
    }
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(record => record.id));
    }
    setSelectAll(!selectAll);
  };

  // Export selected rows to CSV
  const exportToCSV = () => {
    // Only export if there are selected rows
    if (selectedRows.length === 0) return;

    // Get selected records
    const selectedRecords = filteredData.filter(record => selectedRows.includes(record.id));
    
    // Create CSV content
    const headers = ["Auction House", "Account", "Total", "Payments", "Status"];
    const rows = selectedRecords.map(record => 
      [record.auctionHouse, record.account, record.total.toFixed(2), record.payments.toFixed(2), record.status]
    );
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'reconciliation_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render sort indicator
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
      <h1 className="text-2xl font-bold mb-6">Account Reconciliation</h1>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="auctionHouseFilter" className="block text-sm font-medium mb-1">
            Auction House
          </label>
          <div className="relative">
            <Input
              id="auctionHouseFilter"
              type="text"
              placeholder="Filter by auction house..."
              value={auctionHouseFilter}
              onChange={(e) => setAuctionHouseFilter(e.target.value)}
              className="w-full"
              list="auctionHouseOptions"
            />
            <datalist id="auctionHouseOptions">
              {auctionHouses.map((house) => (
                <option key={house} value={house} />
              ))}
            </datalist>
          </div>
        </div>
        
        <div>
          <label htmlFor="accountFilter" className="block text-sm font-medium mb-1">
            Account Number
          </label>
          <div className="relative">
            <Input
              id="accountFilter"
              type="text"
              placeholder="Filter by account..."
              value={accountFilter}
              onChange={(e) => setAccountFilter(e.target.value)}
              className="w-full"
              list="accountOptions"
            />
            <datalist id="accountOptions">
              {accountNumbers.map((account) => (
                <option key={account} value={account} />
              ))}
            </datalist>
          </div>
        </div>
        
        <div>
          <label htmlFor="statusFilter" className="block text-sm font-medium mb-1">
            Status
          </label>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger id="statusFilter" className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Table with selected count and export button */}
      <div className="flex justify-between items-center mb-4">
        <div>
          {selectedRows.length > 0 && (
            <span className="text-sm font-medium">
              {selectedRows.length} {selectedRows.length === 1 ? 'row' : 'rows'} selected
            </span>
          )}
        </div>
        <Button 
          onClick={exportToCSV} 
          disabled={selectedRows.length === 0}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Export Selected
        </Button>
      </div>
      
      {/* Reconciliation Table */}
      <div className="border rounded-md overflow-auto max-h-[600px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                <div className="flex items-center">
                  <Checkbox 
                    checked={selectAll}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all rows"
                  />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('auctionHouse')}
              >
                <div className="flex items-center">
                  Auction House {getSortIndicator('auctionHouse')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('account')}
              >
                <div className="flex items-center">
                  Account {getSortIndicator('account')}
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? filteredData.map((record) => (
              <tr key={record.id} className={cn(
                "hover:bg-gray-50", 
                selectedRows.includes(record.id) ? "bg-blue-50" : ""
              )}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Checkbox 
                    checked={selectedRows.includes(record.id)}
                    onCheckedChange={() => toggleRowSelection(record.id)}
                    aria-label={`Select row ${record.id}`}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.auctionHouse}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.account}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  ${record.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  ${record.payments.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={
                    record.status === "Matched" 
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }>
                    {record.status}
                  </Badge>
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
