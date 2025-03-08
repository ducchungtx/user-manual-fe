'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { API_BASE_URL, getFileById } from '@/lib/api';

// Configure PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer() {
  const { id } = useParams();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Here you would fetch the PDF URL using the document ID
    // This is an example - replace with your actual API endpoint
    const fetchPdfUrl = async () => {
      try {
        setLoading(true);
        // Example API call - replace with your actual implementation
        const response = await getFileById(id as string);
        if (!response.ok) throw new Error('Failed to fetch document');

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

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => {
      const newPage = prevPageNumber + offset;
      if (newPage < 1) return 1;
      if (numPages && newPage > numPages) return numPages;
      return newPage;
    });
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

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Document Viewer</h1>

      {loading && <div className="text-center p-10">Loading document...</div>}

      {error && <div className="text-red-500 p-5">{error}</div>}

      {pdfUrl && (
        <>
          <div className="border rounded-lg shadow-lg p-4 mb-4 bg-white">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={() => setError("Error loading PDF. Please try again.")}
              loading={<div className="text-center p-10">Loading PDF...</div>}
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer
                renderAnnotationLayer
              />
            </Document>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => adjustScale(-0.1)}
              disabled={scale <= 0.5}
              className="h-8 w-8"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span>{(scale * 100).toFixed(0)}%</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => adjustScale(0.1)}
              disabled={scale >= 2}
              className="h-8 w-8"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <Button
              variant="default"
              onClick={previousPage}
              disabled={pageNumber <= 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <p>
              Page {pageNumber} of {numPages}
            </p>
            <Button
              variant="default"
              onClick={nextPage}
              disabled={numPages === null || pageNumber >= numPages}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
