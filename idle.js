let idleTimer;

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(idle, 10 * 1000); // Logout user after 15 minutes of inactivity
}

function idle() {
  console.log("Inactive!");
  
  var logout = document.createElement('form');
  logout.method = 'POST';
  logout.action = '/api/logout';
  document.body.append(logout)
  logout.submit();
}

// Event listeners to reset idle timer on user activity
document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('keypress', resetIdleTimer);

// Initial setup to start the idle timer
resetIdleTimer();