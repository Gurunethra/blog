"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Blog } from "@/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get("/blog/all");
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="text-center py-10">Loading blogs...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Latest Blogs</h1>
        {user && (
          <Link href="/blog/create">
            <Button>Create Blog Post</Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <div className="col-span-full text-center py-20 text-gray-500">
            No blog posts found.
          </div>
        ) : (
          blogs.map((blog) => (
            <Card key={blog.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                <p className="text-sm text-gray-500">By {blog.author?.name || 'Anonymous'}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 line-clamp-3">{blog.content}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/blog/${blog.id}`} className="w-full">
                  <Button variant="outline" className="w-full">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
