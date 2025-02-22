import type { Metadata } from 'next'
import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'About - User Manual Search',
  description: 'Learn about our user manual search platform and its features'
}

export default function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About User Manual Search</h1>
        <div className="prose max-w-none">
          <p className="mb-4">
            Welcome to User Manual Search - your comprehensive platform for finding product manuals and documentation.
          </p>
          <p className="mb-4">
            Our mission is to simplify the process of finding user manuals for any product. We understand the frustration
            of misplacing product manuals or struggling to find them online, which is why we&apos;ve created this centralized
            database of user manuals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p>To become the world&apos;s most comprehensive and accessible user manual database.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Key Features</h3>
              <ul className="list-disc pl-6">
                <li>Advanced search capabilities</li>
                <li>Multiple file format support</li>
                <li>User-friendly interface</li>
                <li>Regular database updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
