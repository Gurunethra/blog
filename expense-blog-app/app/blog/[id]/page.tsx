"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Blog } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function SingleBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await api.get(`/blog/${id}`);
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading blog...</div>;
  if (!blog) return <div className="text-center py-20">Blog not found.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Button variant="ghost" className="flex gap-2" onClick={() => router.back()}>
        <ArrowLeft size={20} /> Back
      </Button>

      <Card className="p-8">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-4xl font-bold leading-tight">{blog.title}</CardTitle>
          <div className="flex justify-between text-sm text-gray-500 mt-4 border-b pb-4">
            <p>By {blog.author?.name || 'Anonymous'}</p>
            <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>
        </CardHeader>
        <CardContent className="px-0 pt-6 prose lg:prose-xl max-w-none">
          {blog.content.split('\n').map((para, i) => (
            <p key={i} className="mb-4 text-gray-700 leading-relaxed whitespace-pre-wrap">{para}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
