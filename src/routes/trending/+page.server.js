import { readFromDatabase,convert_post,trending } from "$lib/server/firebase"


export async function load() {
    try {
      const trendingData = await trending(0);
      return {
        trending: trendingData
      };
    } catch (error) {
      console.error('Error fetching trending data:', error);
      return {
        trending: null 
      };
    }
  }
