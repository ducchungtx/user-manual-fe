const API_BASE_URL = process.env.STRAPI_BASE_URL || 'http://localhost:1337';

export async function getAllBrands() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/brand/getAllBrands`);
    if (!response.ok) {
      throw new Error('Failed to fetch brands');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
}

export async function getManuals() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/manual/getManual`);
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
