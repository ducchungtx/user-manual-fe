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
        <h1 className="text-3xl font-bold mb-6 dark:text-white">About User Manual Search</h1>
        <div className="prose max-w-none dark:prose-invert">
          <p className="mb-4 dark:text-gray-300">
            Welcome to User Manual Search - your comprehensive platform for finding product manuals and documentation.
          </p>
          <p className="mb-4 dark:text-gray-300">
            Our mission is to simplify the process of finding user manuals for any product. We understand the frustration
            of misplacing product manuals or struggling to find them online, which is why we&apos;ve created this centralized
            database of user manuals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Our Vision</h3>
              <p className="dark:text-gray-300">To become the world&apos;s most comprehensive and accessible user manual database.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Key Features</h3>
              <ul className="list-disc pl-6 dark:text-gray-300">
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
