import { readFromDatabase,convert_post,explore } from "$lib/server/firebase"


export async function load() {
    try {
      const trendingData = await explore(0);
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
