import type { Metadata } from 'next'
import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'Licensing - User Manual Search',
  description: 'Licensing information and terms of use for our user manual platform'
}

export default function LicensingPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Licensing Information</h1>
        <div className="prose max-w-none">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-yellow-700">
              All user manuals and documentation available through our platform are subject to their respective
              manufacturers&apos; copyright and licensing terms.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Terms of Use</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Content is provided for personal, non-commercial use only</li>
              <li>Redistribution of manuals is prohibited without permission</li>
              <li>All trademarks and copyrights belong to their respective owners</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Service License</h2>
            <p>
              Our search platform and its features are provided under standard terms of service.
              By using our service, you agree to comply with these terms.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
