# Foge pra Ilha, mas volta pra casa

## Running the Site Locally

This site uses JavaScript includes for the navbar and footer, which requires a local web server to work properly (due to browser security restrictions with the `file://` protocol).

### Option 1: Python Server (Recommended)

```bash
python3 server.py
```

Then open your browser to: `http://localhost:8000`

### Option 2: Node.js http-server

If you have Node.js installed:

```bash
npx http-server
```

### Option 3: PHP Server

If you have PHP installed:

```bash
php -S localhost:8000
```

### Option 4: Python SimpleHTTPServer

```bash
python3 -m http.server 8000
```

## Project Structure

- `index.html` - Main page
- `desafio-2025.html` - Challenge 2025 page
- `includes/` - Reusable components (navbar, footer)
- `js/includes.js` - JavaScript that loads the includes
- `css/styles.css` - Main stylesheet
- `assets/` - Images and media files

## Notes

- The navbar and footer are loaded dynamically via JavaScript
- Make sure to run a local server when developing/testing
- The includes will show error messages if they can't be loaded
