import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900">
          Manage Expenses, <span className="text-primary">Share Stories</span>.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Track your personal finances with ease and read inspiring blogs from our community. All in one place.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/register">
          <Button size="lg" className="px-8 text-lg">Get Started</Button>
        </Link>
        <Link href="/blog">
          <Button size="lg" variant="outline" className="px-8 text-lg">Read Blogs</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-2">Expense Tracking</h3>
          <p className="text-gray-500">Log your daily expenses and categorize them for better insights.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-2">Visual Insights</h3>
          <p className="text-gray-500">See your spending patterns with beautiful charts and summaries.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-2">Community Blog</h3>
          <p className="text-gray-500">Share your financial journey and learn from others in our blog.</p>
        </div>
      </div>
    </div>
  );
}
