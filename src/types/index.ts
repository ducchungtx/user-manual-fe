export interface Brand {
  id: number | string;
  documentId: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Manual {
  id: number;
  modelName: string;
  description: string;
  releaseDate: string;
}

// Add these types for the brand detail API response
export interface BrandDetailResponse {
  data: {
    id: string;
    documentId: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    manuals?: Array<{
      id: string;
      model: string;
      description: string;
      releaseDate: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      documentUrl?: string;
      files: Array<{
        id: number;
        documentId: string;
        name: string;
        url: string;
      }>;
    }>
  },
}