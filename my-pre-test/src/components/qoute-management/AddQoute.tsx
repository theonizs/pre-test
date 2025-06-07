"use client";

import { useState } from "react";
import { useQuoteStore } from "@/stores/quote";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AddQuoteFormProps {
  currentUser: { name: string; email: string } | null;
}

export function AddQuoteForm({ currentUser }: AddQuoteFormProps) {
  const addQuote = useQuoteStore((state) => state.addQuote);
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.name) {
      alert("Please log in to add a quote.");
      return;
    }
    if (!text.trim()) {
      alert("Please fill in the quote text.");
      return;
    }
    addQuote({ text, author: currentUser.name });
    setText("");
  };

  if (!currentUser) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add a New Quote</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="quote-text">Quote</label>
            <Textarea
              className="mt-2"
              id="quote-text"
              placeholder="Enter the quote text..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
            />
          </div>
          {/* เอาช่องกรอก Author ออก */}
          <Button type="submit" className="w-full">
            Add Quote
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
