import { getAllBrands } from '@/lib/api';
import Layout from '../components/Layout';
import { Metadata } from 'next';
import BrandListClient from '../components/BrandListClient';

export const metadata: Metadata = {
  title: 'User Manuals - Browse Brands',
  description: 'Find user manuals for your favorite brands and products.',
  openGraph: {
    title: 'User Manuals - Browse Brands',
    description: 'Find user manuals for your favorite brands and products.'
  }
};

export default async function HomePage() {
  let brands = [];
  let error = null;

  try {
    brands = await getAllBrands();
  } catch (err) {
    error = 'Failed to load brands';
    console.error('Error:', err);
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Browse by Brand</h2>

        {/* Client side component for interactive filtering */}
        <BrandListClient initialBrands={brands} />
      </div>
    </Layout>
  );
}
