
# Glamora Frontend
![Screenshot 2025-01-30 001111](https://github.com/user-attachments/assets/3bda5134-47f2-4e64-a6b3-038678d58767)



Welcome to the Glamora Frontend repository. This project is the frontend part of the Glamora platform, providing a sleek and responsive user interface for managing various functionalities.

## Table of Contents
- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Project Description
The Glamora Frontend is designed to offer an intuitive and seamless experience to users, leveraging modern web technologies. It aims to deliver high performance and accessibility while maintaining a clean and visually appealing design.

## Technologies Used
- **JavaScript**: Main programming language used.
- **React**: For building the user interface.
- **Redux Toolkit**: For state management.
- **Stripe**: For handling payment processing.
- **Axios**: For making HTTP requests.
- **Chart.js**: For creating interactive charts and graphs.
- **Tailwind CSS**: For utility-first CSS framework.
- **Vite**: For fast build tool and development server.

📂 Project Directory Structure - Glamora Frontend
This project is a React-based e-commerce application built with Vite, Redux Toolkit, and Tailwind CSS. Below is an overview of the directory structure.

Root Directory (vai844101-glamora-frontend/).
Configuration & Setup Files.

package.json – Project dependencies & scripts.
vite.config.js – Vite configuration.
tailwind.config.js – Tailwind CSS setup.
vercel.json – Deployment configuration.


Entry Files:

index.html – Main HTML entry point.
main.jsx – React app entry file.
App.jsx – Root component.

📌 src/ - Main Application Code.
🔹 components/ – Reusable UI components (Navbar, Footer, Login, Signup, etc.).
🔹 pages/ – Different pages (Home, Shop, Category, Dashboard, Blog, Search).
🔹 redux/ – State management using Redux Toolkit.
🔹 routers/ – App routing with React Router.
🔹 utils/ – Helper functions (API URLs, date formatting).
🔹 data/ – JSON data files for products, blogs, etc.

📌 public/ - Static Assets.
Stores images, icons, and other public files.

📌 redux/features/ - State Management Modules.
auth/ – User authentication.
cart/ – Shopping cart state.
orders/ – Order management.
products/ – Product state.
reviews/ – Customer reviews.

🚀 Key Features.
✅ User Authentication (Login/Signup).
✅ Product Browsing & Filtering.
✅ Shopping Cart & Checkout.
✅ Admin Dashboard (Manage Orders, Products, Users).
✅ User Dashboard (Orders, Profile, Reviews).
✅ Responsive UI with Tailwind CSS.

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/vai844101/glamora-frontend.git
    cd glamora-frontend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```

## Usage
To start the development server, use the following command:
```bash
npm run dev
This will launch the application at http://localhost:3000. Open your browser and navigate to this URL to start using the application.



**The following npm scripts are available:**

npm run dev: Starts the development server.
npm run build: Builds the application for production.
npm run lint: Runs the linter to check for code quality issues.
npm run preview: Previews the built application.

Fork the repository.
Create a new branch for your feature or bug fix:
bash
git checkout -b feature/your-feature-name
Commit your changes and push the branch:
bash
git commit -m "Add your message here"
git push origin feature/your-feature-name
Open a pull request detailing your changes.


