
import { useState, useEffect } from "react";
import { ReconciliationRecord } from "@/types/reconciliation";

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

export const useReconciliationData = (
  auctionHouseFilter: string,
  accountFilter: string,
  statusFilter: string,
  sortConfig: { key: string; direction: 'ascending' | 'descending' | null }
) => {
  const [data] = useState<ReconciliationRecord[]>(sampleData);
  const [filteredData, setFilteredData] = useState<ReconciliationRecord[]>(sampleData);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    let filtered = [...data];

    if (auctionHouseFilter && auctionHouseFilter !== "Show all") {
      filtered = filtered.filter(record => 
        record.auctionHouse.toLowerCase().includes(auctionHouseFilter.toLowerCase())
      );
    }

    if (accountFilter && accountFilter !== "Show all") {
      filtered = filtered.filter(record => 
        record.account.includes(accountFilter)
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter(record => record.status === statusFilter);
    }

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
    setSelectedRows([]);
    setSelectAll(false);
  }, [data, auctionHouseFilter, accountFilter, statusFilter, sortConfig]);

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

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(record => record.id));
    }
    setSelectAll(!selectAll);
  };

  return {
    filteredData,
    selectedRows,
    selectAll,
    toggleRowSelection,
    toggleSelectAll,
  };
};

