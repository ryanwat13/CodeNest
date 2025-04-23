// ----------------------------
// Theme Toggle with Submenus
// ----------------------------
let currentTheme = localStorage.getItem('theme') || 'blue';

    function changeTheme(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
    hideAllSubmenus(); // hide submenus after selection
  }

  function toggleDropdown() {
  const dropdown = document.getElementById("theme-dropdown");
  dropdown.classList.toggle("show");
  hideAllSubmenus();
}

  function toggleSubmenu(color) {
    hideAllSubmenus();
    const submenu = document.getElementById(`${color}-submenu`);
    if (submenu) {
      submenu.style.display = "block";
    }
  }

  function hideAllSubmenus() {
    const submenus = document.querySelectorAll(".dropdown-submenu");
    submenus.forEach((menu) => (menu.style.display = "none"));
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    changeTheme(savedTheme);
  }

// ----------------------------
// Search & Autocomplete Logic
// ----------------------------
function filterFiles() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const toolCards = document.querySelectorAll('.tool-card');

  toolCards.forEach(card => {
    const heading = card.querySelector('.card-title h3').textContent.toLowerCase();
    card.style.display = heading.startsWith(query) ? 'block' : 'none';
  });

  populateSuggestions(query);
}

function populateSuggestions(query) {
  const suggestionBox = document.getElementById('search-suggestions');
  suggestionBox.innerHTML = '';

  if (!query) {
    suggestionBox.style.display = 'none';
    return;
  }

  const toolCards = document.querySelectorAll('.tool-card');
  const matches = [];

  toolCards.forEach(card => {
    const heading = card.querySelector('.card-title h3').textContent.trim();
    if (heading.toLowerCase().startsWith(query)) {
      matches.push(heading);
    }
  });

  if (matches.length === 0) {
    suggestionBox.style.display = 'none';
    return;
  }

  matches.forEach(match => {
    const div = document.createElement('div');
    div.textContent = match;
    div.classList.add('suggestion-item');
    div.onclick = () => {
      document.getElementById('search-input').value = match;
      suggestionBox.style.display = 'none';
      filterFiles();
    };
    suggestionBox.appendChild(div);
  });

  suggestionBox.style.display = 'block';
}

document.addEventListener('click', function (event) {
  const suggestionBox = document.getElementById('search-suggestions');
  const input = document.getElementById('search-input');
  if (!suggestionBox.contains(event.target) && event.target !== input) {
    suggestionBox.style.display = 'none';
  }
});

// ----------------------------
// Copy & Download Code Buttons
// ----------------------------
function copyCode(elementId) {
  const codeElement = document.getElementById(elementId);
  const code = codeElement.textContent;
  navigator.clipboard.writeText(code).then(() => {
    let tooltipId;
    switch (elementId) {
      case 'autotyper-code': tooltipId = 'autotyper-tooltip'; break;
      case 'customcmd-code': tooltipId = 'customcmd-tooltip'; break;
      case 'passgen-code': tooltipId = 'passgen-tooltip'; break;
      case 'zipcracker-code': tooltipId = 'zipcracker-tooltip'; break;
      case 'guessinggame-code': tooltipId = 'guessinggame-tooltip'; break;
    }
    const tooltip = document.getElementById(tooltipId);
    tooltip.textContent = "Copied!";
    tooltip.classList.add('show');
    setTimeout(() => {
      tooltip.classList.remove('show');
      setTimeout(() => tooltip.textContent = "Copy to clipboard", 300);
    }, 2000);
  }).catch(err => console.error('Could not copy text: ', err));
}

function downloadCode(elementId, filename) {
  const codeElement = document.getElementById(elementId);
  const code = codeElement.textContent;
  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  let tooltipId;
  switch (elementId) {
    case 'autotyper-code': tooltipId = 'autotyper-download-tooltip'; break;
    case 'customcmd-code': tooltipId = 'customcmd-download-tooltip'; break;
    case 'passgen-code': tooltipId = 'passgen-download-tooltip'; break;
    case 'zipcracker-code': tooltipId = 'zipcracker-download-tooltip'; break;
    case 'guessinggame-code': tooltipId = 'guessinggame-download-tooltip'; break;
  }

  const tooltip = document.getElementById(tooltipId);
  tooltip.textContent = "Downloaded!";
  tooltip.classList.add('show');
  setTimeout(() => {
    tooltip.classList.remove('show');
    setTimeout(() => tooltip.textContent = "Download file", 300);
  }, 2000);
}

// ----------------------------
// Collapsible Code Blocks
// ----------------------------
document.querySelectorAll('.collapsible').forEach(button => {
  const content = button.nextElementSibling;
  button.addEventListener('click', () => {
    if (content.classList.contains('show')) {
      content.style.maxHeight = null;
      content.style.opacity = '0';
      content.classList.remove('show');
    } else {
      document.querySelectorAll('.content.show').forEach(openContent => {
        openContent.style.maxHeight = null;
        openContent.style.opacity = '0';
        openContent.classList.remove('show');
      });
      content.style.maxHeight = `${content.scrollHeight}px`;
      content.style.opacity = '1';
      content.classList.add('show');
    }
  });
});

// ----------------------------
// Page Loader Fade Out
// ----------------------------
window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 2500); // <- You can increase this number to control the loader duration
});

