import fs from 'fs';

export async function GET() {
  // Read the contents of the text file
  const filePath = './src/routes/policy/txt/policy.txt';
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Return the contents in the response body
  const response = new Response(fileContents, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });

  return response;
}
