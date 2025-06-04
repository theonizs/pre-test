import QuoteCard from "@/components/home/QuoteCard";

export default function MyComponent() {
  const quotesData = [
    {
      quoteId: "q1",
      initialQuote: {
        text: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde",
        upvotes: 120,
        downvotes: 5,
      },
    },
    { quoteId: "q2" }, // This one will lazy load
    {
      quoteId: "q3",
      initialQuote: {
        text: "The only true wisdom is in knowing you know nothing.",
        author: "Socrates",
        upvotes: 80,
        downvotes: 10,
      },
    },
    { quoteId: "q4" }, // This one will lazy load
    { quoteId: "q5" },
    {
      quoteId: "q6",
      initialQuote: {
        text: "Life is what happens when you're busy making other plans.",
        author: "John Lennon",
        upvotes: 150,
        downvotes: 8,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 rounded">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
        Quotes of the Day
      </h1>
      <div
        className="
          grid
          grid-cols-1            /* Default: 1 column on mobile */
          sm:grid-cols-2          /* On small screens (sm breakpoint) and up: 2 columns */
          md:grid-cols-3          /* On medium screens (md breakpoint) and up: 3 columns */
          lg:grid-cols-4          /* On large screens (lg breakpoint) and up: 4 columns */
          gap-6                   /* Gap between grid items */
          justify-items-center    /* Center items within their grid cells */
          container mx-auto p-4 sm:p-6 md:p-8 /* Container styling */
        "
      >
        {quotesData.map((data) => (
          <QuoteCard
            key={data.quoteId}
            quoteId={data.quoteId}
            initialQuote={data.initialQuote}
          />
        ))}
      </div>
    </div>
  );
}
