// Load includes (navbar and footer)
document.addEventListener('DOMContentLoaded', function() {
    // Function to load HTML file
    function loadHTML(url, placeholderId) {
        return new Promise(function(resolve, reject) {
            // Try fetch first
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    const placeholder = document.getElementById(placeholderId);
                    if (placeholder) {
                        placeholder.outerHTML = data;
                        resolve(data);
                    } else {
                        reject(new Error('Placeholder element not found: ' + placeholderId));
                    }
                })
                .catch(error => {
                    // Fallback to XMLHttpRequest
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 0 || xhr.status === 200) {
                                const placeholder = document.getElementById(placeholderId);
                                if (placeholder) {
                                    placeholder.outerHTML = xhr.responseText;
                                    resolve(xhr.responseText);
                                } else {
                                    reject(new Error('Placeholder element not found: ' + placeholderId));
                                }
                            } else {
                                reject(new Error('Failed to load ' + url + ': ' + xhr.status));
                            }
                        }
                    };
                    xhr.send();
                });
        });
    }
    
    // Load navbar
    loadHTML('includes/navbar.html', 'navbar-placeholder')
        .then(data => {
            
            // Set active nav link based on current page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('#navbarResponsive .nav-link');
            
            navLinks.forEach(link => {
                const linkPage = link.getAttribute('data-page');
                const linkHref = link.getAttribute('href');
                
                // Set active state
                if (currentPage === 'desafio-2025.html' && linkPage === 'desafio-2025') {
                    link.classList.add('active');
                } else if (currentPage === 'local-percurso.html' && linkPage === 'local-percurso') {
                    link.classList.add('active');
                } else if (currentPage === 'index.html' || currentPage === '') {
                    // For index page, update links to use hash anchors
                    if (linkHref.includes('index.html#')) {
                        const hash = linkHref.split('#')[1];
                        link.setAttribute('href', '#' + hash);
                    }
                    
                    // Check if we're on a specific section (for scrollspy)
                    const hash = window.location.hash;
                    if (hash && link.getAttribute('href') === hash) {
                        link.classList.add('active');
                    }
                }
            });
            
            // Update navbar brand link for index page
            if (currentPage === 'index.html' || currentPage === '') {
                const brandLink = document.querySelector('.navbar-brand');
                if (brandLink) {
                    brandLink.setAttribute('href', '#page-top');
                }
            }
            
            // Initialize navbar functionality after it's loaded
            // Navbar shrink function
            var navbarShrink = function () {
                const navbarCollapsible = document.body.querySelector('#mainNav');
                if (!navbarCollapsible) {
                    return;
                }
                if (window.scrollY === 0) {
                    navbarCollapsible.classList.remove('navbar-shrink')
                } else {
                    navbarCollapsible.classList.add('navbar-shrink')
                }
            };
            
            // Shrink the navbar 
            navbarShrink();
            
            // Shrink the navbar when page is scrolled
            document.addEventListener('scroll', navbarShrink);
            
            // Activate Bootstrap scrollspy on the main nav element
            if (typeof bootstrap !== 'undefined') {
                const mainNav = document.body.querySelector('#mainNav');
                if (mainNav) {
                    new bootstrap.ScrollSpy(document.body, {
                        target: '#mainNav',
                        rootMargin: '0px 0px -40%',
                    });
                }
                
                // Collapse responsive navbar when toggler is visible
                const navbarToggler = document.body.querySelector('.navbar-toggler');
                const responsiveNavItems = [].slice.call(
                    document.querySelectorAll('#navbarResponsive .nav-link')
                );
                responsiveNavItems.map(function (responsiveNavItem) {
                    responsiveNavItem.addEventListener('click', () => {
                        if (window.getComputedStyle(navbarToggler).display !== 'none') {
                            navbarToggler.click();
                        }
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            // Show error message to user
            const placeholder = document.getElementById('navbar-placeholder');
            if (placeholder) {
                placeholder.innerHTML = '<div style="padding: 20px; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px;">Erro ao carregar o menu. Por favor, certifique-se de que está executando o site em um servidor web local.</div>';
            }
        });
    
    // Load footer
    loadHTML('includes/footer.html', 'footer-placeholder')
        .then(data => {
            // Footer loaded successfully
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            // Show error message to user
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) {
                placeholder.innerHTML = '<div style="padding: 20px; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px;">Erro ao carregar o rodapé. Por favor, certifique-se de que está executando o site em um servidor web local.</div>';
            }
        });
});
