"use client";

import QuoteCard from "@/components/home/QuoteCard";
import SearchBar from "@/components/home/SearchBar";
import FilterControls from "@/components/home/FilterControls";
import SortControls from "@/components/home/SortControls";
import { QuoteBarChart } from "@/components/home/QuoteBarChart";

import { useQuoteStore } from "@/stores/quote";
import { useAuthStore } from "@/stores/useAuth";
import { useEffect, useMemo, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";

export default function Section1() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userVotes = useAuthStore((state) => state.votes);
  const handleUserVote = useAuthStore((state) => state.handleVote);

  const quotesList = useQuoteStore((state) => state.quotes);
  const fetchQuotes = useQuoteStore((state) => state.fetchQuotes);
  const updateVoteCounts = useQuoteStore((state) => state.updateVoteCounts);
  const isLoading = useQuoteStore((state) => state.isLoading);

  const onVote = (quoteId: string, voteType: "up" | "down") => {
    if (!isAuthenticated) return;

    const existingVote = userVotes[quoteId];
    let voteChanges = { up: 0, down: 0 };

    if (existingVote === voteType) {
      // ยกเลิกโหวต
      voteChanges =
        voteType === "up" ? { up: -1, down: 0 } : { up: 0, down: -1 };
    } else if (existingVote) {
      // เปลี่ยนใจ
      voteChanges =
        voteType === "up"
          ? { up: 1, down: -1 } // จาก down เป็น up
          : { up: -1, down: 1 }; // จาก up เป็น down
    } else {
      // โหวตครั้งแรก
      voteChanges = voteType === "up" ? { up: 1, down: 0 } : { up: 0, down: 1 };
    }

    handleUserVote(quoteId, voteType);
    updateVoteCounts(quoteId, voteChanges);
  };

  const uniqueAuthors = useMemo(
    () => [...new Set(quotesList.map((q) => q.initialQuote!.author))],
    [quotesList]
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [sortKey, setSortKey] = useState("createdAt_desc");

  const displayedQuotes = useMemo(() => {
    let filtered = [...quotesList];

    if (searchQuery) {
      filtered = filtered.filter((q) =>
        q.initialQuote!.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedAuthor && selectedAuthor !== "all") {
      filtered = filtered.filter(
        (q) => q.initialQuote!.author === selectedAuthor
      );
    }
    if (dateRange.start) {
      filtered = filtered.filter(
        (q) => q.initialQuote!.createdAt >= new Date(dateRange.start)
      );
    }
    if (dateRange.end) {
      filtered = filtered.filter(
        (q) => q.initialQuote!.createdAt <= new Date(dateRange.end)
      );
    }

    const [key, order] = sortKey.split("_");
    type SortableKey = keyof Omit<
      (typeof quotesList)[0]["initialQuote"],
      "id" | "text" | "author"
    >;

    filtered.sort((a, b) => {
      let valA: number | Date, valB: number | Date;
      if (key === "total") {
        valA = a.initialQuote!.upvotes + a.initialQuote!.downvotes;
        valB = b.initialQuote!.upvotes + b.initialQuote!.downvotes;
      } else {
        const sortKey = key as SortableKey;
        valA = a.initialQuote![sortKey];
        valB = b.initialQuote![sortKey];
      }

      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [quotesList, searchQuery, selectedAuthor, dateRange, sortKey]);

  const chartData = useMemo(() => {
    if (!quotesList || quotesList.length === 0) {
      return [];
    }

    // ใช้ reduce เพื่อหาผลรวม
    const totals = quotesList.reduce(
      (acc, curr) => {
        acc.upvotes += curr.initialQuote!.upvotes;
        acc.downvotes += curr.initialQuote!.downvotes;
        return acc;
      },
      { upvotes: 0, downvotes: 0 }
    );

    // จัดรูปแบบข้อมูลให้ตรงกับที่ Chart Component ต้องการ
    return [
      {
        name: "Total Votes", // ชื่อแกน X
        upvotes: totals.upvotes,
        downvotes: totals.downvotes,
        total: totals.upvotes + totals.downvotes,
      },
    ];
  }, [quotesList]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold text-center mb-4text-gray-800 dark:text-gray-100">
        Quotes of the Day
      </h1>
      {!isAuthenticated && (
        <div className="text-xl font-semibold text-center my-4">
          Please log in to vote.
        </div>
      )}

      <div className="w-full flex justify-center mb-4">
        <div className="h-[42px] w-fit border rounded-md bg-white dark:bg-gray-800 p-2 px-4">
          <Link href="/my-component">Create my quote</Link>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="max-w-[1200px] border bg-white dark:bg-gray-800 rounded-lg container mx-auto p-4 sm:p-4 md:p-6 ">
          <div className="w-full">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className="w-full">
            <FilterControls
              authors={uniqueAuthors}
              selectedAuthor={selectedAuthor}
              setSelectedAuthor={setSelectedAuthor}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center container mx-auto pt-4 ">
        <Collapsible>
          <CollapsibleTrigger className="w-full flex justify-center cursor-pointer">
            <div className="border rounded-md bg-white dark:bg-gray-800 p-2 px-4">
              View chart
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {quotesList.length > 0 && (
              <div className="max-w-lg mx-auto mb-8 p-4 bg-card dark:bg-card rounded-lg border mt-4">
                <QuoteBarChart data={chartData} />
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="w-full flex justify-end container mx-auto p-2 sm:p-4 md:p-6 ">
        <div className="w-[180px]">
          <SortControls sortKey={sortKey} setSortKey={setSortKey} />
        </div>
      </div>

      <div
        className="
          grid
          grid-cols-1            /* Default: 1 column on mobile */
          sm:grid-cols-2          /* On small screens (sm breakpoint) and up: 2 columns */
          md:grid-cols-3          /* On medium screens (md breakpoint) and up: 3 columns */
          lg:grid-cols-4          /* On large screens (lg breakpoint) and up: 4 columns */
          gap-6                   /* Gap between grid items */
          justify-items-center    /* Center items within their grid cells */
          container mx-auto p-4 sm:p-4 md:p-6 /* Container styling */
        "
      >
        {isLoading && displayedQuotes.length === 0 ? (
          Array.from({ length: 8 }).map((_, index) => (
            <QuoteCard
              key={index}
              quoteId={""}
              initialQuote={undefined}
              onVote={onVote}
            />
          ))
        ) : !isLoading && displayedQuotes.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No quotes found.
          </p>
        ) : displayedQuotes.length > 0 ? (
          displayedQuotes.map((data) => (
            <QuoteCard
              key={data.quoteId}
              quoteId={data.quoteId}
              initialQuote={data.initialQuote}
              onVote={onVote}
              userVote={userVotes[data.quoteId]}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No quotes found.
          </p>
        )}
      </div>
    </div>
  );
}
