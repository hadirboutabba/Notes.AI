import React, { useState } from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Play, X } from 'lucide-react';
import { useDiaryStore } from '../lib/store';

export function Dashboard() {
  const { entries, addEntry, updateEntry, deleteEntry } = useDiaryStore();
  const [currentEntry, setCurrentEntry] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateEntry(editingId, currentEntry);
      setEditingId(null);
    } else {
      addEntry(currentEntry);
    }
    setCurrentEntry('');
  };

  const handleRecommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentEntry.trim()) {
      if (editingId) {
        updateEntry(editingId, currentEntry);
        setEditingId(null);
      } else {
        addEntry(currentEntry);
      }
      // Directly set a video URL when "Recommend" is clicked
      setSelectedVideo(
        'https://www.youtube.com/embed/FsztuzyXdhY?si=-7bbM2ZNI5d17Kvz'
      ); // Replace with your video URL
    }
  };

  const handleEdit = (id: string, content: string) => {
    setEditingId(id);
    setCurrentEntry(content);
  };

  const handleClear = () => {
    setCurrentEntry('');
    setEditingId(null);
    setSelectedVideo(null);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? 'Edit Entry' : 'New Entry'}
          </h2>
          <form className="space-y-4">
            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              className="w-full h-40 p-3 border rounded-md focus:ring focus:ring-sky-soft"
              placeholder="Write your thoughts..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleSubmit}
                className="bg-sky-soft text-gray-800 px-4 py-2 rounded-md hover:bg-sky-soft/90"
              >
                {editingId ? 'Update' : 'Save'}
              </button>
              <button
                onClick={handleRecommand}
                className="bg-sky-soft text-gray-800 px-4 py-2 rounded-md hover:bg-sky-soft/90"
              >
                Recommend
              </button>
              <button
                onClick={handleClear}
                type="button"
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Entries</h2>
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="border rounded-md p-4 hover:border-sky-soft"
              >
                <p className="text-gray-800 mb-2">{entry.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    {format(new Date(entry.createdAt), 'MMM d, yyyy h:mm a')}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(entry.id, entry.content)}
                      className="p-1 hover:text-gray-800"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="p-1 hover:text-gray-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {selectedVideo && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Video Player</h2>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={selectedVideo}
                className="w-full h-full rounded-md"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
