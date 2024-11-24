import React from 'react';
import { Link } from 'react-router-dom';
import { BookText, Heart, Shield } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Notes.AI
        </h1>
        <p className="text-xl text-gray-custom max-w-2xl mx-auto">
          A safe space to document your thoughts, feelings, and experiences with
          intelligent recommendations tailored just for you.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-white px-6 py-3 rounded-lg shadow-md text-gray-800 hover:shadow-lg transition-shadow"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <BookText className="h-12 w-12 text-gray-custom mb-4" />
          <h2 className="text-xl font-semibold mb-2">Digital Journal</h2>
          <p className="text-gray-custom">
            Write and store your thoughts securely in your personal digital
            space.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Heart className="h-12 w-12 text-gray-custom mb-4" />
          <h2 className="text-xl font-semibold mb-2">Smart Recommendations</h2>
          <p className="text-gray-custom">
            Get personalized content suggestions based on your entries.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Shield className="h-12 w-12 text-gray-custom mb-4" />
          <h2 className="text-xl font-semibold mb-2">Private & Secure</h2>
          <p className="text-gray-custom">
            Your entries are protected and only accessible to you.
          </p>
        </div>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <img
            src="https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Person writing in journal"
            className="rounded-lg shadow-md"
          />
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-sky-soft p-2 rounded-full">
                <span className="font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold">Write Your Entry</h3>
                <p className="text-gray-custom">
                  Document your thoughts, feelings, and experiences in your
                  private digital journal.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-sky-soft p-2 rounded-full">
                <span className="font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold">Get Recommendations</h3>
                <p className="text-gray-custom">
                  Our system analyzes your entry and suggests relevant content
                  to help you explore your thoughts further.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-sky-soft p-2 rounded-full">
                <span className="font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold">Review & Reflect</h3>
                <p className="text-gray-custom">
                  Look back on your journey and see how your thoughts and
                  feelings have evolved over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
