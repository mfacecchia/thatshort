<h1 align = "center">Thatshort</h1>
<p align = "center">Just a URL Shortener, nothing special actually</p>

<h2>Table of contents</h2>
<a href = "brief-description">Brief Description</a>
<a href = "#built-in">Built in - Technologies</a><br>
<a href = "#modules-references">Modules References</a><br>
<a href = "#installing-dependencies">Installing Dependencies</a><br>
<a href = "#environmental-variables">Environmental Variables</a><br>
<a href = "#app-routes">App Routes</a><br>
<hr>

<h2 id = "brief-description">Brief Description</h2>
<p><p>The idea for this project came in a moment of absolute boredom. I wanted to build something really small, which would take a small amount of time to build, so here it is. What this app does is simply get from a form the URL to shorten and return the same in a shortened form which can be used to simplify the sharing of links and documents between machines (I always hate to copy and paste the same link over and over from a machine to another, that's so annoying).</p></p>

<h2 id = "built-in">Built in - Technologies</h2>
<img src = "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt = "HTML">
<img src = "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt = "CSS">
<img src = "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt = "TypeScript">
<img src = "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt = "React.JS">
<img src = "https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt = "Vite">
<br>
<img src = "https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt = "Node.js">
<img src = "https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" alt = "Express.js">
<br>
<img src = "https://img.shields.io/badge/postcss-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white" alt = "PostCSS">
<img src = "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt = "TailwindCSS">
<img src = "https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt = "Shadcn/ui">
<br>
<img src = "https://img.shields.io/badge/PostgreSQL-316192?styl" alt = "PostgreSQL">
<img src = "https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt = "Prisma ORM">
<hr>

<h2 id = "modules-references">Modules References</h2>
<h4>Core Functionalities</h4>
<a href = "https://expressjs.com/en/4x/api.html#express">Express.JS</a> |
<a href = "https://www.npmjs.com/package/cors">CORS</a> |
<a href = "https://postcss.org/">PostCSS</a> |
<a href = "https://tailwindcss.com/docs/installation">Tailwind CSS</a> |
<a href = "https://ui.shadcn.com">Shadcn/ui</a> |
<a href = "https://www.prisma.io/docs/getting-started/quickstart">Prisma ORM</a> |
<a href = "https://react.dev">React.JS</a> |
<a href = "https://vite.dev">Vite</a> |
<a href = "https://reactrouter.com">React Router</a> |
<a href = "https://react-hook-form.com">React Hook Form</a> |
<a href = "https://zod.dev">Zod</a> |

<h2 id = "installing-dependencies">Installing App Dependencies</h2>
<p>To quickly install all modules used in this project, just run the following in your terminal and you'll be good to go!</p>
```zsh
cd backend
npm i
cd ../frontend
npm i
```
<b>DISCLAIMER: in order to correctly execute this command you will need to install <a href = "https://nodejs.org/en/download/package-manager">Node.JS</a> in your system since it's the main requirement to run the app.</b>
<hr>

<h2 id = "environmental-variables">Environmental Variables</h2>
<p>All the application's environmental variables are available for customization in a <code>.env.sample</code> script for both the backend and the frontend. Feel free to tweak the values to fit your specific needs.</p>
<b>IMPORTANT NOTE:</b> <span>in order for the environmental variables to be correctly read by dotenv, you need to rename each file to <code>.env</code>.</span>
<hr>

<h2 id = "app-routes">App Routes</h2>
<p>All the main routes for this application start with <code>/api/{version}</code> and are mainly used to retrieve, add, and update values from/to the Database.</p>
<p>The application currently features a <code>GET</code> endpoint for URL retrieval, and a <code>POST</code> endpoint for creation.</p>
