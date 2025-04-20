
export interface ReconciliationRecord {
  id: number;
  auctionHouse: string;
  account: string;
  total: number;
  payments: number;
  status: "Matched" | "Unmatched";
}

export const auctionHouses = ["House A", "House B", "House C", "House D", "House E", "House F"];
export const accountNumbers = ["10001", "10002", "10003", "10004", "10005"];
export const statusOptions = ["All", "Matched", "Unmatched"];

