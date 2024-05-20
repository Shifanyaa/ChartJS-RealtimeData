// export async function get() {
// 	const response = await fetch('https://dummyjson.com/products');
// 	const data = await response.json();
// 	return { body: data };
// }

// let data;

// async function fetchData() {
// 	const eventSource = new EventSource('/your-sse-endpoint'); // Replace with your endpoint

// 	eventSource.onmessage = (event) => {
// 		data = JSON.parse(event.data);
// 	};

// 	// Handle potential errors (optional)
// 	eventSource.onerror = (error) => {
// 		console.error('Error with SSE:', error);
// 	};
// }

// fetchData();


export async function GET() {
  const response = await fetch('http://localhost:3000'); // Replace with your actual backend URL

  if (!response.ok) {
    // Handle potential errors from the backend server
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return new Response(JSON.stringify(data));
}
