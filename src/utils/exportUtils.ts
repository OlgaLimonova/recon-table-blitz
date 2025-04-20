
import { ReconciliationRecord } from "@/types/reconciliation";

export const exportToCSV = (selectedRows: number[], records: ReconciliationRecord[]) => {
  if (selectedRows.length === 0) return;

  const selectedRecords = records.filter(record => selectedRows.includes(record.id));
  
  const headers = ["Auction House", "Account", "Total", "Payments", "Status"];
  const rows = selectedRecords.map(record => 
    [record.auctionHouse, record.account, record.total.toFixed(2), record.payments.toFixed(2), record.status]
  );
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'reconciliation_export.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

