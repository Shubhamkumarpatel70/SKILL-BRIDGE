// Function to update the current time
function updateTime() {
    const currentTimeElement = document.getElementById('currentTime');
    const now = new Date();
    
    // Format hours for 12-hour format
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12

    // Get the current day
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[now.getDay()];

    currentTimeElement.textContent = `${day}, ${hours}:${minutes}:${seconds} ${ampm}`;
}

// Function to update the current year
function updateYear() {
    const currentYearElement = document.getElementById('currentYear');
    currentYearElement.textContent = new Date().getFullYear();
}

// Update time every second
setInterval(updateTime, 1000);

// Set the current year on page load
updateYear();