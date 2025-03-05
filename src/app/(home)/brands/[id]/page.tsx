import React from 'react';
import { getBrandById } from '@/lib/api';
import { BrandDetailResponse } from '@/types';
import Layout from '@/components/Layout';
import { FiFileText, FiDownload } from 'react-icons/fi';

interface BrandInfoProps {
  params: {
    id: string;
  }
}

async function BrandInfo({ params }: BrandInfoProps) {
  try {
    // Extract the actual ID from the URL parameter, which might contain additional characters
    const brandId = params.id;
    const brandData = await getBrandById(brandId) as BrandDetailResponse;
    const brand = brandData.data;
    const manuals = brand.manuals || [];

    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{brand.name}</h1>

            <div className="mb-6">
              <p className="text-gray-700 whitespace-pre-line">{brand.description}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Available Manuals</h2>
              {manuals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {manuals.map(manual => (
                    <div key={manual.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-all">
                      <h3 className="text-lg font-medium text-gray-800 flex items-center">
                        <FiFileText className="mr-2" /> {manual.model}
                      </h3>
                      <p className="text-gray-600 mb-3">{manual.description}</p>
                      <p className="text-sm text-gray-500 mb-3">Last updated: {new Date(manual.updatedAt).toLocaleDateString()}</p>
                      {manual.files && manual.files.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800 mb-2">Downloadable Files</h4>
                          <ul>
                            {manual.files.map(file => (
                              <li key={file.id} className="flex items-center">
                                <FiDownload className="mr-2" />
                                <a
                                  href={`/api/download?url=${encodeURIComponent(file.url)}&name=${encodeURIComponent(file.name)}`}
                                  className="text-blue-500 hover:underline"
                                >
                                  {file.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No manuals available for this brand.</p>
              )}
            </div>

            <div className="text-sm text-gray-500">
              <p>Last updated: {new Date(brand.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  } catch (error) {
    console.error("Failed to load brand data:", error);
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-700">Could not load brand information. Please try again later.</p>
          </div>
        </div>
      </Layout>
    );
  }
}

export default BrandInfo;
