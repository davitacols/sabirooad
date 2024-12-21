import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const blogPosts = [
  {
    title: "The Future of AI in Architecture",
    description: "Exploring how artificial intelligence is reshaping the field of architecture and urban planning.",
    date: "2023-06-15",
    slug: "future-of-ai-in-architecture"
  },
  {
    title: "Top 10 Iconic Buildings of the 21st Century",
    description: "A curated list of the most influential and innovative architectural marvels of our time.",
    date: "2023-06-10",
    slug: "top-10-iconic-buildings"
  },
  {
    title: "Sustainable Architecture: Trends and Innovations",
    description: "Discover the latest trends in eco-friendly building design and construction.",
    date: "2023-06-05",
    slug: "sustainable-architecture-trends"
  }
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center">SABIROAD Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.description}</p>
              <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
                Read more
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

