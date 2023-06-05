/ JavaScript code for your web app

// Add an event listener to a button
const button = document.querySelector('#myButton');

button.addEventListener('click', () => {
  // Perform some action when the button is clicked
  console.log('Button clicked!');
});

// Fetch data from an API
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    // Process the fetched data
    console.log('Fetched data:', data);
  })
  .catch(error => {
    // Handle any errors that occur during the fetch
    console.error('Error fetching data:', error);
  });

// Change the welcome message
const welcomeMessage = document.querySelector('#welcomeMessage');
welcomeMessage.textContent = 'Welcome to Top 5000 Albums';

// Set the header and footer content
const header = document.querySelector('#header');
header.innerHTML = `
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/albums">Albums</a></li>
      <li><a href="/reviews">Reviews</a></li>
      <li><a href="/users">Users</a></li>
      <li><a href="/login">Login</a></li>
      <li><a href="/signup">Sign Up</a></li>
    </ul>
  </nav>
`;

const footer = document.querySelector('#footer');
footer.innerHTML = `
  <p>&copy; 2023 Top 5000 Albums. All rights reserved.</p>
`;
