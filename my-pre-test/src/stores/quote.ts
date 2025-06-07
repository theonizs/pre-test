// store/quoteStore.ts
import { create } from "zustand";

export interface Quote {
  quoteId: string;
  initialQuote?: {
    createdAt: Date;
    text: string;
    author: string;
    upvotes: number;
    downvotes: number;
  };
}

interface QuoteState {
  quotes: Quote[];
  isLoading: boolean;
  error: string | null;

  fetchQuotes: () => void;

  updateVoteCounts: (
    quoteId: string,
    voteChanges: { up: number; down: number }
  ) => void;

  addQuote: (data: { text: string; author: string }) => void;
  deleteQuote: (quoteId: string) => void;
}

export const useQuoteStore = create<QuoteState>((set) => ({
  quotes: [
    {
      quoteId: crypto.randomUUID(),
      initialQuote: {
        createdAt: new Date("2025-05-06T11:46:26+07:00"),
        text: "ทุกการเติบโต ย่อมปวดหลังเสมอ",
        author: "Oscar Wilde",
        upvotes: 120,
        downvotes: 5,
      },
    },
    {
      quoteId: crypto.randomUUID(),
      initialQuote: {
        createdAt: new Date("2025-06-02T14:46:26+07:00"),
        text: "ผมร่วงอย่างเดียวไม่พอ ผมเหงาอีก ท้อว่ะ",
        author: "Socrates",
        upvotes: 80,
        downvotes: 10,
      },
    },
    {
      quoteId: crypto.randomUUID(),
      initialQuote: {
        createdAt: new Date("2025-06-05T08:46:26+07:00"),
        text: "หนังที่ดีที่สุด ยกให้หนังไก่ทอด",
        author: "John Lennon",
        upvotes: 150,
        downvotes: 8,
      },
    },
    {
      quoteId: crypto.randomUUID(),
      initialQuote: {
        createdAt: new Date("2025-02-09T08:46:26+07:00"),
        text: "ทางที่ดีที่สุดคือ ทางตรง ขอบคุณครับ",
        author: "กุ๊กไก่เอง",
        upvotes: 47,
        downvotes: 2,
      },
    },
    {
      quoteId: crypto.randomUUID(),
      initialQuote: {
        createdAt: new Date("2025-02-09T08:46:26+07:00"),
        text: "คุกกี้อาจจะเสี่ยงทาย แต่ผิดกฎหมายอาจเสี่ยงคุกนะจ๊ะ",
        author: "ทนาย คลายร้อน",
        upvotes: 147,
        downvotes: 22,
      },
    },
    {
      quoteId: crypto.randomUUID(),
      initialQuote: {
        createdAt: new Date("2025-02-09T08:46:26+07:00"),
        text: "คุกกี้อาจจะเสี่ยงทาย แต่ผิดกฎหมายอาจเสี่ยงคุกนะจ๊ะ",
        author: "ทนาย คลายร้อน",
        upvotes: 347,
        downvotes: 25,
      },
    },
    {
      quoteId: crypto.randomUUID(),
      initialQuote: {
        createdAt: new Date("2025-02-09T08:46:26+07:00"),
        text: "คุกกี้อาจจะเสี่ยงทาย แต่ผิดกฎหมายอาจเสี่ยงคุกนะจ๊ะ",
        author: "ทนาย คลายร้อน",
        upvotes: 7,
        downvotes: 1,
      },
    },
    {
      quoteId: crypto.randomUUID(),
      initialQuote: {
        createdAt: new Date("2025-02-09T08:46:26+07:00"),
        text: "คุกกี้อาจจะเสี่ยงทาย แต่ผิดกฎหมายอาจเสี่ยงคุกนะจ๊ะ",
        author: "ทนาย คลายร้อน",
        upvotes: 99,
        downvotes: 52,
      },
    },
  ],
  isLoading: false,
  error: null,
  fetchQuotes: () => {
    set({ isLoading: true, error: null });

    // Simulate fetching quotes from a backend API

    set((state) => ({
      quotes: [...state.quotes],
    }));

    setTimeout(() => {
      set({ isLoading: false });
    }, 1000);
  },

  // {
  //         quoteId: crypto.randomUUID(),
  //         initialQuote: {
  //           createdAt: new Date("2025-05-06T11:46:26+07:00"),
  //           text: "ทุกการเติบโต ย่อมปวดหลังเสมอ",
  //           author: "Oscar Wilde",
  //           upvotes: 120,
  //           downvotes: 5,
  //         },
  //       },
  //       {
  //         quoteId: crypto.randomUUID(),
  //         initialQuote: {
  //           createdAt: new Date("2025-06-02T14:46:26+07:00"),
  //           text: "ผมร่วงอย่างเดียวไม่พอ ผมเหงาอีก ท้อว่ะ",
  //           author: "Socrates",
  //           upvotes: 80,
  //           downvotes: 10,
  //         },
  //       },
  //       {
  //         quoteId: crypto.randomUUID(),
  //         initialQuote: {
  //           createdAt: new Date("2025-06-05T08:46:26+07:00"),
  //           text: "หนังที่ดีที่สุด ยกให้หนังไก่ทอด",
  //           author: "John Lennon",
  //           upvotes: 150,
  //           downvotes: 8,
  //         },
  //       },
  //       {
  //         quoteId: crypto.randomUUID(),
  //         initialQuote: {
  //           createdAt: new Date("2025-02-09T08:46:26+07:00"),
  //           text: "ทางที่ดีที่สุดคือ ทางตรง ขอบคุณครับ",
  //           author: "กุ๊กไก่เอง",
  //           upvotes: 47,
  //           downvotes: 2,
  //         },
  //       },
  //       {
  //         quoteId: crypto.randomUUID(),
  //         initialQuote: {
  //           createdAt: new Date("2025-02-09T08:46:26+07:00"),
  //           text: "คุกกี้อาจจะเสี่ยงทาย แต่ผิดกฎหมายอาจเสี่ยงคุกนะจ๊ะ",
  //           author: "ทนาย คลายร้อน",
  //           upvotes: 147,
  //           downvotes: 22,
  //         },
  //       },
  //       {
  //         quoteId: crypto.randomUUID(),
  //         initialQuote: {
  //           createdAt: new Date("2025-02-09T08:46:26+07:00"),
  //           text: "คุกกี้อาจจะเสี่ยงทาย แต่ผิดกฎหมายอาจเสี่ยงคุกนะจ๊ะ",
  //           author: "ทนาย คลายร้อน",
  //           upvotes: 347,
  //           downvotes: 25,
  //         },
  //       },
  //       {
  //         quoteId: crypto.randomUUID(),
  //         initialQuote: {
  //           createdAt: new Date("2025-02-09T08:46:26+07:00"),
  //           text: "คุกกี้อาจจะเสี่ยงทาย แต่ผิดกฎหมายอาจเสี่ยงคุกนะจ๊ะ",
  //           author: "ทนาย คลายร้อน",
  //           upvotes: 7,
  //           downvotes: 1,
  //         },
  //       },
  //       {
  //         quoteId: crypto.randomUUID(),
  //         initialQuote: {
  //           createdAt: new Date("2025-02-09T08:46:26+07:00"),
  //           text: "คุกกี้อาจจะเสี่ยงทาย แต่ผิดกฎหมายอาจเสี่ยงคุกนะจ๊ะ",
  //           author: "ทนาย คลายร้อน",
  //           upvotes: 99,
  //           downvotes: 52,
  //         },
  //       },

  updateVoteCounts: (quoteId, voteChanges) => {
    set((state) => ({
      quotes: state.quotes.map((q) =>
        q.quoteId === quoteId
          ? {
              ...q,
              initialQuote: {
                ...q.initialQuote!,
                upvotes: q.initialQuote!.upvotes + voteChanges.up,
                downvotes: q.initialQuote!.downvotes + voteChanges.down,
              },
            }
          : q
      ),
    }));
  },

  addQuote: (data) => {
    const newQuote: Quote = {
      quoteId: crypto.randomUUID(),
      initialQuote: {
        text: data.text,
        author: data.author,
        createdAt: new Date(),
        upvotes: 0,
        downvotes: 0,
      },
    };
    set((state) => ({
      quotes: [newQuote, ...state.quotes],
    }));
  },
  deleteQuote: (quoteId) => {
    set((state) => ({
      quotes: state.quotes.filter((q) => q.quoteId !== quoteId),
    }));
  },
}));
