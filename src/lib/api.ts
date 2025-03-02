const API_BASE_URL = process.env.STRAPI_BASE_URL || 'http://localhost:1337';

export async function getAllBrands() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/brand/getAll`, {
      cache: 'no-store' // Ensures fresh data on each request
    });
    if (!response.ok) {
      throw new Error('Failed to fetch brands');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
}

// Add this new function for paginated brands
export async function getPaginatedBrands(page = 1, limit = 20) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands?page=${page}&limit=${limit}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch brands');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching paginated brands:', error);
    throw error;
  }
}

export async function getBrandById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/brands/${id}?populate=*`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch brand with id ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching brand ${id}:`, error);
    throw error;
  }
}

export async function getManuals() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/manual/getManual`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch manuals');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching manuals:', error);
    throw error;
  }
}
