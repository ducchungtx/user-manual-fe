import type { Metadata } from 'next'
import Layout from '@/components/Layout'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us - User Manual Search',
  description: 'Get in touch with our team for support or inquiries'
}

export default function ContactPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">Contact Us</h1>
        <div className="max-w-2xl mx-auto">
          <p className="mb-8 dark:text-gray-300">
            Have questions or suggestions? We&apos;d love to hear from you. Fill out the form below
            and we&apos;ll get back to you as soon as possible.
          </p>
          <ContactForm />
        </div>
      </div>
    </Layout>
  )
}
