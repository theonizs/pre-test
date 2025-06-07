"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortControlsProps {
  sortKey: string;
  setSortKey: (key: string) => void;
}

const SortControls: React.FC<SortControlsProps> = ({ sortKey, setSortKey }) => (
  <div className="bg-white rounded-md">
    <Select value={sortKey} onValueChange={setSortKey}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="createdAt_desc">Sort by Newest</SelectItem>
        <SelectItem value="createdAt_asc">Sort by Oldest</SelectItem>
        <SelectItem value="upvotes_desc">Sort by Upvotes</SelectItem>
        <SelectItem value="downvotes_desc">Sort by Downvotes</SelectItem>
        <SelectItem value="total_desc">Sort by Total Votes</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default SortControls;
