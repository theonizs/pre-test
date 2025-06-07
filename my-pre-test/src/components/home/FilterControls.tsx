"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterControlsProps {
  authors: string[];
  selectedAuthor: string;
  setSelectedAuthor: (author: string) => void;
  dateRange: { start: string; end: string };
  setDateRange: (range: { start: string; end: string }) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  authors,
  selectedAuthor,
  setSelectedAuthor,
  dateRange,
  setDateRange,
}) => (
  <div className="flex flex-col md:flex-row gap-4">
    <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Filter by Author" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Authors</SelectItem>
        {authors.map((author) => (
          <SelectItem key={author} value={author}>
            {author}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <div className="w-full lg:w-1/2 flex gap-2">
      <Input
        type="date"
        aria-label="Start date"
        value={dateRange.start}
        max={dateRange.end || ""}
        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        className="w-1/2"
      />
      <Input
        type="date"
        aria-label="End date"
        value={dateRange.end}
        min={dateRange.start || ""}
        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        className="w-1/2"
      />
    </div>
  </div>
);

export default FilterControls;
