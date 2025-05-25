// src/services/api.js
const API_BASE_URL = 'https://682992156075e87073a6d905.mockapi.io/api/albums'; // Replace with your mockapi.io URL

export const fetchAlbums = async () => {
  const response = await fetch(`${API_BASE_URL}/albums`);
  if (!response.ok) {
    throw new Error('Failed to fetch albums');
  }
  return await response.json();
};

export const createAlbum = async (albumData) => {
  try {
    console.log("Sending albumData:", albumData); // 👈 Log the data being sent
    const response = await fetch(`${API_BASE_URL}/albums`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(albumData)
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(errorData.message || "Failed to create album");
    }
    return await response.json();
  } catch (error) {
    console.error("Full error:", error);
    throw error;
  }
};

export const updateAlbum = async (id, albumData) => {
  const response = await fetch(`${API_BASE_URL}/albums/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(albumData),
  });
  if (!response.ok) {
    throw new Error('Failed to update album');
  }
  return await response.json();
};

export const deleteAlbum = async (id) => {
  const response = await fetch(`${API_BASE_URL}/albums/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete album');
  }
  return await response.json();
};