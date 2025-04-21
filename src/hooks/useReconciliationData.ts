
import { useState, useEffect } from "react";
import { ReconciliationRecord, auctionHouses, accountNumbers } from "@/types/reconciliation";

// Generate 375 records (75 auction houses × 5 accounts)
const generateSampleData = (): ReconciliationRecord[] => {
  const records: ReconciliationRecord[] = [];
  let id = 1;

  for (const auctionHouse of auctionHouses) {
    for (const account of accountNumbers) {
      let total: number;
      let payments: number;
      const isMatched = Math.random() > 0.3; // 70% chance of being matched

      if (account === "10001") {
        // 4 digits, .00
        total = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        total = Number(total.toFixed(0));
        payments = isMatched
          ? total
          : Math.max(
              0,
              total - Math.floor(Math.random() * Math.min(total, 1000))
            );
        payments = Number(payments.toFixed(0));
      } else if (account === "10002") {
        // 5 digits, .00
        total = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
        total = Number(total.toFixed(0));
        payments = isMatched
          ? total
          : Math.max(
              0,
              total - Math.floor(Math.random() * Math.min(total, 5000))
            );
        payments = Number(payments.toFixed(0));
      } else {
        // 6-9 digits, .00
        total = Math.floor(Math.random() * (999_999_999 - 100_000 + 1) + 100_000);
        total = Number(total.toFixed(0));
        payments = isMatched
          ? total
          : Math.max(
              0,
              total - Math.floor(Math.random() * Math.min(total, 100_000))
            );
        payments = Number(payments.toFixed(0));
      }

      // Ensure .00 after comma
      total = Number(total.toFixed(2));
      payments = Number(payments.toFixed(2));

      records.push({
        id: id++,
        auctionHouse,
        account,
        total,
        payments,
        status: isMatched ? "Matched" : "Unmatched"
      });
    }
  }

  return records;
};

const sampleData: ReconciliationRecord[] = generateSampleData();

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
