'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Sidebar } from 'lucide-react';
import { API_BASE_URL, getFileById } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Layout from '@/components/Layout';

// Configure PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer() {
  const { id } = useParams();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState<string | null>(null);
  const [showThumbnails, setShowThumbnails] = useState(true);

  useEffect(() => {
    // Here you would fetch the PDF URL using the document ID
    // This is an example - replace with your actual API endpoint
    const fetchPdfUrl = async () => {
      try {
        setLoading(true);
        // Example API call - replace with your actual implementation
        const response = await getFileById(id as string);
        if (!response) throw new Error('Failed to fetch document');

        setPdfUrl(`${API_BASE_URL}${response.url}`);
      } catch (err) {
        setError('Could not load the document. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchPdfUrl();
    }
  }, [id]);

  // Add keyboard navigation for page turning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        previousPage();
      } else if (e.key === 'ArrowRight') {
        nextPage();
      }
    };

    // Add event listener when component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPages, pageNumber]); // Re-add listener when these dependencies change

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
    setPageInput('1');
    setLoading(false);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => {
      const newPage = prevPageNumber + offset;
      if (newPage < 1) return 1;
      if (numPages && newPage > numPages) return numPages;
      setPageInput(newPage.toString());
      return newPage;
    });
  }

  function goToPage(page: number) {
    if (page >= 1 && page <= (numPages || 1)) {
      setPageNumber(page);
      setPageInput(page.toString());
    }
  }

  // New function to jump to a specific page
  function jumpToPage() {
    const pageNum = parseInt(pageInput);
    if (!isNaN(pageNum) && pageNum >= 1 && numPages && pageNum <= numPages) {
      setPageNumber(pageNum);
    } else {
      // Reset input to current page if invalid
      setPageInput(pageNumber.toString());
    }
  }

  function handlePageInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPageInput(e.target.value);
  }

  function handlePageInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      jumpToPage();
    }
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function adjustScale(delta: number) {
    setScale(prevScale => {
      const newScale = prevScale + delta;
      if (newScale < 0.5) return 0.5;
      if (newScale > 2) return 2;
      return newScale;
    });
  }

  // Generate array of page numbers for thumbnails
  const pageNumbers = Array.from(
    { length: numPages || 0 },
    (_, index) => index + 1
  );

  return (
    <Layout>
      <div className="flex flex-col md:flex-row h-[calc(100vh-100px)] w-full p-2">
        {/* Thumbnails sidebar */}
        {pdfUrl && showThumbnails && (
          <div className="w-full md:w-48 lg:w-64 border-r border-gray-200 dark:border-gray-700 overflow-y-auto mr-4 flex-shrink-0">
            <div className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-medium dark:text-gray-200">Pages</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowThumbnails(false)}
                className="h-7 w-7 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-2 space-y-2">
              {pageNumbers.map((page) => (
                <div
                  key={page}
                  className={cn(
                    "cursor-pointer rounded overflow-hidden border-2 transition-colors",
                    pageNumber === page
                      ? "border-blue-500 dark:border-blue-400"
                      : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                  onClick={() => goToPage(page)}
                >
                  <div className="relative bg-gray-50 dark:bg-gray-800">
                    <Document file={pdfUrl}>
                      <Page
                        pageNumber={page}
                        scale={0.15}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="pointer-events-none"
                      />
                    </Document>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                      {page}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex flex-col flex-grow items-center">
          <div className="flex justify-between w-full mb-4">
            <h1 className="text-2xl font-bold dark:text-white">Document Viewer</h1>

            {pdfUrl && !showThumbnails && (
              <Button
                variant="outline"
                onClick={() => setShowThumbnails(true)}
                className="flex items-center gap-1"
              >
                <Sidebar className="h-4 w-4" />
                Show Thumbnails
              </Button>
            )}
          </div>

          {loading && <div className="text-center p-10 dark:text-gray-300">Loading document...</div>}

          {error && <div className="text-red-500 dark:text-red-400 p-5">{error}</div>}

          {pdfUrl && (
            <>
              <div className="border rounded-lg shadow-lg p-4 mb-4 bg-white dark:bg-gray-800 dark:border-gray-700 max-w-full overflow-auto">
                {/* Add a light background container for PDF in dark mode */}
                <div className={`${scale < 1 ? 'flex justify-center' : ''} ${!showThumbnails ? 'bg-white rounded' : ''}`}>
                  <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={() => setError("Error loading PDF. Please try again.")}
                    loading={<div className="text-center p-10 dark:text-gray-300">Loading PDF...</div>}
                  >
                    <Page
                      pageNumber={pageNumber}
                      scale={scale}
                      renderTextLayer
                      renderAnnotationLayer
                      className="shadow-md"
                    />
                  </Document>
                </div>
              </div>

              {/* Consolidated PDF Controls */}
              <div className="flex flex-wrap items-center justify-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900 w-full max-w-3xl border dark:border-gray-700">
                {/* Page Navigation Controls */}
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={previousPage}
                    disabled={pageNumber <= 1}
                    className="h-8 w-8"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center mx-1 px-1">
                    <Input
                      type="text"
                      value={pageInput}
                      onChange={handlePageInputChange}
                      onKeyDown={handlePageInputKeyDown}
                      onBlur={jumpToPage}
                      className="w-12 h-8 text-center mr-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      aria-label="Current page"
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400">/ {numPages}</span>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextPage}
                    disabled={numPages === null || pageNumber >= numPages}
                    className="h-8 w-8"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Divider */}
                <div className="h-6 border-l border-gray-300 dark:border-gray-600 mx-1"></div>

                {/* Zoom Controls */}
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => adjustScale(-0.1)}
                    disabled={scale <= 0.5}
                    className="h-8 w-8"
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>

                  <select
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="h-8 bg-transparent border-0 text-sm text-center focus:ring-0 w-20 dark:text-gray-300 dark:focus:ring-offset-gray-800"
                  >
                    <option value="0.5">50%</option>
                    <option value="0.75">75%</option>
                    <option value="1">100%</option>
                    <option value="1.25">125%</option>
                    <option value="1.5">150%</option>
                    <option value="2">200%</option>
                  </select>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => adjustScale(0.1)}
                    disabled={scale >= 2}
                    className="h-8 w-8"
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
