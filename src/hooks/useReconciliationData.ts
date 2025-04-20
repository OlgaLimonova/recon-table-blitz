
import { useState, useEffect } from "react";
import { ReconciliationRecord, auctionHouses, accountNumbers } from "@/types/reconciliation";

const sampleData: ReconciliationRecord[] = [
  { id: 1, auctionHouse: auctionHouses[0], account: "10001", total: 123456789.00, payments: 123456789.00, status: "Matched" },
  { id: 2, auctionHouse: auctionHouses[1], account: "10001", total: 32345678.00, payments: 32345478.00, status: "Unmatched" },
  { id: 3, auctionHouse: auctionHouses[2], account: "10002", total: 4567890.00, payments: 4567890.00, status: "Matched" },
  { id: 4, auctionHouse: auctionHouses[3], account: "10003", total: 987654.00, payments: 987454.00, status: "Unmatched" },
  { id: 5, auctionHouse: auctionHouses[4], account: "10002", total: 2345678.00, payments: 2345678.00, status: "Matched" },
  { id: 6, auctionHouse: auctionHouses[5], account: "10004", total: 76543210.00, payments: 76543010.00, status: "Unmatched" },
  { id: 7, auctionHouse: auctionHouses[6], account: "10003", total: 8765432.00, payments: 8765432.00, status: "Matched" },
  { id: 8, auctionHouse: auctionHouses[7], account: "10005", total: 45678901.00, payments: 45678901.00, status: "Matched" },
  { id: 9, auctionHouse: auctionHouses[8], account: "10004", total: 23456789.00, payments: 23456589.00, status: "Unmatched" },
  { id: 10, auctionHouse: auctionHouses[9], account: "10005", total: 5432109.00, payments: 5432109.00, status: "Matched" },
  { id: 11, auctionHouse: auctionHouses[10], account: "10001", total: 98765432.00, payments: 98765232.00, status: "Unmatched" },
  { id: 12, auctionHouse: auctionHouses[11], account: "10003", total: 3456789.00, payments: 3456789.00, status: "Matched" },
  { id: 13, auctionHouse: auctionHouses[12], account: "10002", total: 65432109.00, payments: 65432109.00, status: "Matched" },
  { id: 14, auctionHouse: auctionHouses[13], account: "10004", total: 87654321.00, payments: 87654121.00, status: "Unmatched" },
  { id: 15, auctionHouse: auctionHouses[14], account: "10001", total: 12345678.00, payments: 12345678.00, status: "Matched" },
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
    // Modified to simply clear selected rows without toggling
    setSelectedRows([]);
    setSelectAll(false);
  };

  const selectAllRows = () => {
    setSelectedRows(filteredData.map(record => record.id));
    setSelectAll(true);
  };

  return {
    filteredData,
    selectedRows,
    selectAll,
    toggleRowSelection,
    toggleSelectAll,
    selectAllRows,
  };
};
