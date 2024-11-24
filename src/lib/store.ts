import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DiaryEntry {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DiaryStore {
  entries: DiaryEntry[];
  addEntry: (content: string) => void;
  updateEntry: (id: string, content: string) => void;
  deleteEntry: (id: string) => void;
}

export const useDiaryStore = create<DiaryStore>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (content) =>
        set((state) => ({
          entries: [
            {
              id: crypto.randomUUID(),
              content,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            ...state.entries,
          ],
        })),
      updateEntry: (id, content) =>
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.id === id
              ? { ...entry, content, updatedAt: new Date() }
              : entry
          ),
        })),
      deleteEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        })),
    }),
    {
      name: 'diary-storage',
    }
  )
);