"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useAuthStore } from "@/stores/useAuth";
import { dayjsFormat } from "utils/dayjs";

interface QuoteCardProps {
  quoteId: string; // Unique ID for the quote
  initialQuote?: {
    createdAt: Date;
    text: string;
    author: string;
    upvotes: number;
    downvotes: number;
  };
  // Optional prop to simulate loading, useful for parent components
  // If true, it will show skeletons regardless of initialQuote
  onVote: (quoteId: string, voteType: "up" | "down") => void;
  userVote?: "up" | "down";
}

const QuoteCard: React.FC<QuoteCardProps> = ({
  quoteId,
  initialQuote,
  onVote,
  userVote,
}) => {
  const { isAuthenticated } = useAuthStore();
  const [quote, setQuote] = useState(initialQuote);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (initialQuote) {
      setQuote(initialQuote);
    } else {
      setQuote(undefined);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [initialQuote]);

  return (
    <div className="flex flex-col p-4 border rounded-lg bg-white dark:bg-gray-800 w-full max-w-xs sm:max-w-sm md:max-w-md">
      {loading || !quote ? (
        // Skeleton loading state
        <>
          <Skeleton className="w-full h-24 sm:h-32 rounded-md mb-4" />{" "}
          {/* Quote text skeleton */}
          <Skeleton className="w-3/4 h-5 rounded mb-4" />{" "}
          {/* Author skeleton */}
          <div className="flex justify-between items-center mt-auto">
            <div className="flex justify-between items-center w-2/4 h-8 rounded">
              <Skeleton className="w-2/4 h-8 rounded mr-2" />{" "}
              {/* Upvote count skeleton */}
              <Skeleton className="w-2/4 h-8 rounded " />{" "}
              {/* Downvote count skeleton */}{" "}
            </div>
            <Skeleton className="w-1/4 h-8 rounded" />{" "}
          </div>
        </>
      ) : (
        // Actual quote content
        <>
          <p className="text-lg italic text-gray-800 dark:text-gray-100 mb-4">
            &quot;{quote.text}&quot;
          </p>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">
            by - {quote.author}
          </p>
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-4">
            created - {dayjsFormat(quote.createdAt, "DD MMM YYYY")}
          </p>
          <div className="flex flex-wrap justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Button
                variant={"ghost"}
                size="sm"
                onClick={() => onVote(quoteId, "up")}
                disabled={!isAuthenticated}
                className="dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              >
                {userVote === "up" ? (
                  "👍 "
                ) : (
                  <ThumbsUp className="h-4 w-4 mr-1" />
                )}
                {quote.upvotes}
              </Button>
              <Button
                variant={"ghost"}
                size="sm"
                onClick={() => onVote(quoteId, "down")}
                disabled={!isAuthenticated}
                className="dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              >
                {userVote === "down" ? (
                  "👎 "
                ) : (
                  <ThumbsDown className="h-4 w-4 mr-1" />
                )}
                {quote.downvotes}
              </Button>
            </div>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-600 px-2">
              Total: {quote.upvotes + quote.downvotes}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default QuoteCard;
