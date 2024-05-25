console.log("Hello from app.js");
async function fetchData() {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      document.getElementById('output').textContent = data.message;
    } catch (error) {
      console.error('Error fetching data:', error);
      document.getElementById('output').textContent = 'Error fetching data';
    }
  }
  
  window.onload = fetchData;