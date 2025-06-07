"use client";

import { useMemo } from "react";
import { useQuoteStore } from "@/stores/quote";
import { useAuthStore } from "@/stores/useAuth";
import { AddQuoteForm } from "@/components/qoute-management/AddQoute";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { dayjsFormat } from "utils/dayjs";

export default function MyComponentPage() {
  const allQuotes = useQuoteStore((state) => state.quotes);
  const deleteQuote = useQuoteStore((state) => state.deleteQuote);
  const currentUser = useAuthStore((state) => state.user);

  const myQuotes = useMemo(() => {
    if (!currentUser?.name) {
      return [];
    }

    return allQuotes.filter(
      (quote) => quote.initialQuote?.author === currentUser.name
    );
  }, [allQuotes, currentUser]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">My Quotes Management</h1>
        <AddQuoteForm currentUser={currentUser} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
          My Created Quotes ({myQuotes.length})
        </h2>

        {myQuotes.length === 0 ? (
          <p className="text-center text-muted-foreground mt-8">
            {currentUser
              ? "You haven't created any quotes yet. Add one above!"
              : "Please log in to see your quotes."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myQuotes.map(({ quoteId, initialQuote }) => (
              <Card key={quoteId} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="italic">
                    &quot;{initialQuote?.text}&quot;
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-2">
                    by - {initialQuote?.author}
                  </p>

                  <p className="text-muted-foreground">
                    created -{" "}
                    {dayjsFormat(initialQuote?.createdAt, "DD MMM YYYY")}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => deleteQuote(quoteId)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
