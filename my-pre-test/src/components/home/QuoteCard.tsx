"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface QuoteCardProps {
  quoteId: string; // Unique ID for the quote
  initialQuote?: {
    text: string;
    author: string;
    upvotes: number;
    downvotes: number;
  };
  // Optional prop to simulate loading, useful for parent components
  // If true, it will show skeletons regardless of initialQuote
  forceLoading?: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({
  quoteId,
  initialQuote,
  forceLoading = false,
}) => {
  const [quote, setQuote] = useState(initialQuote);
  const [isLoading, setIsLoading] = useState(forceLoading || !initialQuote);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data for the quote
    // In a real app, this would be an API call
    if (!initialQuote && !forceLoading) {
      setIsLoading(true);
      setError(null);
      const timer = setTimeout(() => {
        // Example fetched data
        const fetchedQuote = {
          text: "The only way to do great work is to love what you do.",
          author: "Steve Jobs",
          upvotes: Math.floor(Math.random() * 100),
          downvotes: Math.floor(Math.random() * 20),
        };
        setQuote(fetchedQuote);
        setIsLoading(false);
      }, 1500); // Simulate network delay

      return () => clearTimeout(timer);
    }
  }, [quoteId, initialQuote, forceLoading]);

  const handleVote = (type: "up" | "down") => {
    if (!quote) return;
    // Simulate API call to update vote
    console.log(`Voting ${type} for quoteId: ${quoteId}`);
    setQuote((prevQuote) => {
      if (!prevQuote) return prevQuote;
      return {
        ...prevQuote,
        upvotes: type === "up" ? prevQuote.upvotes + 1 : prevQuote.upvotes,
        downvotes:
          type === "down" ? prevQuote.downvotes + 1 : prevQuote.downvotes,
      };
    });
    // In a real app, you'd send this update to your backend
  };

  if (error) {
    return (
      <div className="p-4 border rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200">
        Error loading quote: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 border rounded-lg  bg-white dark:bg-gray-800 w-full max-w-xs sm:max-w-sm md:max-w-md">
      {isLoading || !quote ? (
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
            - {quote.author}
          </p>
          <div className="flex flex-wrap justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote("up")}
                className="dark:text-gray-200 dark:hover:bg-gray-700"
              >
                {/* <ThumbsUp className="h-4 w-4 mr-1" /> */}
                👍 {quote.upvotes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote("down")}
                className="dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                {quote.downvotes}
                {/* 👎 {quote.downvotes} */}
              </Button>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 px-2">
              Total: {quote.upvotes + quote.downvotes}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default QuoteCard;
