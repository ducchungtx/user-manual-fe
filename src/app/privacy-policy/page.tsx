import type { Metadata } from 'next'
import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'Privacy Policy - User Manual Search',
  description: 'Privacy policy and data protection information for our users'
}

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="text-sm text-gray-600 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Information Collection</h2>
              <p>
                We collect information that you provide directly to us when using our user manual search service.
                This includes search queries and optional account information if you choose to create one.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
              <p>
                We implement industry-standard security measures to protect your personal information.
                All data is encrypted and stored securely on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
              <p>
                Our website uses cookies to enhance your browsing experience and analyze website traffic.
                You can manage cookie preferences through your browser settings.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}
