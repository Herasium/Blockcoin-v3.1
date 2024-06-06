import { readFromDatabase,convert_post,trending } from "$lib/server/firebase"
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';


export async function load({ url }) {

      let q = url.searchParams.get('offset');
      const trendingData = await trending(q);
      
      if (q < 0) {
        return {
          trending: [{
            data:{data:'I have a secret for you.'},
            profile:{display:"1/5: 00000",badges:[]}
          }]
        };
      }
      if (Object.keys(trendingData).length == 0) {
        error(416, {
          message: 'No Data Left'
        });
      }
      return {
        trending: trendingData
      };
    
}


