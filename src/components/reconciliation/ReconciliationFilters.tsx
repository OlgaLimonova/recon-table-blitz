
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { auctionHouses, accountNumbers, statusOptions } from "@/types/reconciliation";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label htmlFor="auctionHouseFilter" className="block text-sm font-medium mb-1">
          Auction House
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between h-10">
              {auctionHouseFilter || "Select auction house"}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--trigger-width)] min-w-[200px]">
            <DropdownMenuItem onClick={() => setAuctionHouseFilter("")}>
              Show all
            </DropdownMenuItem>
            {auctionHouses.map((house) => (
              <DropdownMenuItem
                key={house}
                onClick={() => setAuctionHouseFilter(house)}
              >
                {house}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <label htmlFor="accountFilter" className="block text-sm font-medium mb-1">
          Account Number
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between h-10">
              {accountFilter || "Select account"}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--trigger-width)] min-w-[200px]">
            <DropdownMenuItem onClick={() => setAccountFilter("")}>
              Show all
            </DropdownMenuItem>
            {accountNumbers.map((account) => (
              <DropdownMenuItem
                key={account}
                onClick={() => setAccountFilter(account)}
              >
                {account}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <label htmlFor="statusFilter" className="block text-sm font-medium mb-1">
          Status
        </label>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger id="statusFilter" className="w-full h-10">
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
  );
};

export default ReconciliationFilters;

