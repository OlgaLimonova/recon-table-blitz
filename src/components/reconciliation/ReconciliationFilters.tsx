
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { auctionHouses, accountNumbers } from "@/types/reconciliation";

interface ReconciliationFiltersProps {
  auctionHouseFilter: string;
  setAuctionHouseFilter: (value: string) => void;
  accountFilter: string;
  setAccountFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const ReconciliationFilters = ({
  auctionHouseFilter,
  setAuctionHouseFilter,
  accountFilter,
  setAccountFilter,
  statusFilter,
  setStatusFilter,
}: ReconciliationFiltersProps) => {
  // Filters show "Show all" + all account numbers (now only 4-digit)
  const filteredAuctionHouses = ["Show all", ...auctionHouses.filter(house => house !== "Show all")];
  const filteredAccountNumbers = ["Show all", ...accountNumbers.filter(account => account !== "Show all")];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label htmlFor="auctionHouseFilter" className="block text-sm font-medium mb-1">
          Auction House
        </label>
        <Select
          value={auctionHouseFilter || "Show all"}
          onValueChange={setAuctionHouseFilter}
        >
          <SelectTrigger className="w-full h-10 hover:border-blue-600 hover:border-2 transition-colors">
            <SelectValue placeholder="Select auction house" />
          </SelectTrigger>
          <SelectContent>
            {filteredAuctionHouses.map((house) => (
              <SelectItem key={house} value={house}>
                {house}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="accountFilter" className="block text-sm font-medium mb-1">
          Account Number
        </label>
        <Select
          value={accountFilter || "Show all"}
          onValueChange={setAccountFilter}
        >
          <SelectTrigger className="w-full h-10 hover:border-blue-600 hover:border-2 transition-colors">
            <SelectValue placeholder="Select account" />
          </SelectTrigger>
          <SelectContent>
            {filteredAccountNumbers.map((account) => (
              <SelectItem key={account} value={account}>
                {account}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="statusFilter" className="block text-sm font-medium mb-1">
          Status
        </label>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-full h-10 hover:border-blue-600 hover:border-2 transition-colors">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Show all</SelectItem>
            <SelectItem value="Matched">Matched</SelectItem>
            <SelectItem value="Unmatched">Unmatched</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ReconciliationFilters;
