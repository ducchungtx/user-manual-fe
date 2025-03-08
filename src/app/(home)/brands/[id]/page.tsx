import React from 'react';
import { getBrandById } from '@/lib/api';
import { BrandDetailResponse } from '@/types';
import Layout from '@/components/Layout';
import { FiFileText, FiDownload, FiEye } from 'react-icons/fi';
import Link from 'next/link';

interface BrandInfoProps {
  params: {
    id: string;
  }
}

// Helper function to check if a file is a PDF
function isPdfFile(filename: string): boolean {
  return filename.toLowerCase().endsWith('.pdf');
}

async function BrandInfo({ params }: BrandInfoProps) {
  try {
    // Extract the actual ID from the URL parameter, which might contain additional characters
    const brandId = await params.id;
    const brandData = await getBrandById(brandId) as BrandDetailResponse;
    const brand = brandData.data;
    const manuals = brand.manuals || [];

    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">{brand.name}</h1>

            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{brand.description}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Available Manuals</h2>
              {manuals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {manuals.map(manual => (
                    <div key={manual.id} className="border dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 flex items-center">
                        <FiFileText className="mr-2" /> {manual.model}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{manual.description}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Last updated: {new Date(manual.updatedAt).toLocaleDateString()}</p>
                      {manual.files && manual.files.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Downloadable Files</h4>
                          <ul className="space-y-2">
                            {manual.files.map(file => (
                              <li key={file.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <FiDownload className="mr-2 text-gray-600 dark:text-gray-300" />
                                  <a
                                    href={`/api/download?url=${encodeURIComponent(file.url)}&name=${encodeURIComponent(file.name)}`}
                                    className="text-blue-500 dark:text-blue-400 hover:underline"
                                  >
                                    {file.name}
                                  </a>
                                </div>
                                {isPdfFile(file.name) && (
                                  <Link href={`/documents/${file.id}/view`} passHref>
                                    <button className="flex items-center text-sm bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                                      <FiEye className="mr-1" /> View
                                    </button>
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No manuals available for this brand.</p>
              )}
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
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
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h1>
            <p className="text-gray-700 dark:text-gray-300">Could not load brand information. Please try again later.</p>
          </div>
        </div>
      </Layout>
    );
  }
}

export default BrandInfo;
