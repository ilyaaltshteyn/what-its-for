// hot-key to focus search bar
document.addEventListener('keyup', (e) => {
    if (e.code === 'Slash') {
      $('#search-bar').focus();
    }
  });

  // hot-key to search
  document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
      $('#search-button').click();
    }
  });
