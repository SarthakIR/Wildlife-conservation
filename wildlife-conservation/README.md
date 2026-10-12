# WildEarth — Wildlife & Nature Conservation Website

WildEarth is a responsive, multi-page educational website designed to raise awareness about wildlife conservation, biodiversity, and the practical actions people can take to protect ecosystems.

Built using **HTML5**, **CSS3**, and **JavaScript**, this project focuses on creating a visually engaging and accessible conservation-themed web experience for a student portfolio or class project.

## Project overview

This project combines storytelling, educational content, and interactive elements to help users:

- Learn about endangered and vulnerable species
- Understand key conservation threats and challenges
- Explore wildlife through a searchable directory and gallery
- Test their knowledge with a short quiz
- Take part in a demo pledge interaction that demonstrates front-end form design

The overall goal is to present conservation awareness in a clear, approachable, and visually appealing way while teaching core front-end development skills.

## Pages in the project

- `index.html` — homepage with hero section, storytelling layout, featured species, stats, and calls to action
- `species.html` — searchable species directory with filters based on conservation category
- `conservation.html` — conservation tips, threat education, and a demo donation/pledge form
- `gallery.html` — photo gallery with clickable image modal for a fuller visual experience
- `quiz.html` — interactive wildlife quiz with answer feedback and final score

## Project structure

```text
wildlife-conservation/
├── index.html
├── species.html
├── conservation.html
├── gallery.html
├── quiz.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   └── local wildlife images and assets
├── README.md
└── assets/
    └── reserved for future media or project files
```

## Key features

- Responsive layout for desktop and mobile screens
- Sticky navigation and consistent branding across pages
- Search and filter functionality for species data
- Educational conservation cards and structured content sections
- Wildlife gallery with modal image expansion
- Animated or interactive stat elements on the homepage
- Self-contained quiz with score tracking and restart flow
- Demo donation form with validation and confirmation messages
- Semantic HTML and accessible labeling for better usability
- Reduced-motion-friendly behavior and thoughtful styling choices

## Design goals

The design follows a conservation-focused visual approach:

- Earthy forest greens and neutral tones to reflect nature and sustainability
- Large typography and editorial-style headings for a magazine-like feel
- Card-based layouts to make information easy to scan
- Strong imagery and spacing to create emotional impact
- A calm but informative tone to support awareness without overwhelming the user

## Demo limitations

This project is a demonstration website and not a production backend system. Please note the following:

- The pledge form does not process real payments or store personal data.
- The newsletter/demo forms are for visual and front-end demonstration only.
- Wildlife images may load from external services such as Unsplash and require internet access.
- The conservation statistics used in the site are broad educational figures and should be verified before formal academic or publication use.
- Species status labels are educational summaries and should be checked against the latest IUCN assessments for accuracy.
- A real donation system, signup flow, or database would require a secure backend and trusted payment integration.

## Technology used

- HTML5 for structure and semantic content
- CSS3 for responsive layout, styling, and visual design
- JavaScript for interactivity, filtering, modal behavior, and quiz logic

## GitHub + Vercel deployment

### 1. Create a GitHub repository

1. Sign in to GitHub and create a new repository, for example `wildlife-conservation`.
2. Keep it public if you want to share the project as an online portfolio piece.
3. Upload or push the project files from your local folder.

### 2. Push the project from VS Code

Open the repo folder in VS Code and run:

```bash
git init
git add .
git commit -m "Build WildEarth conservation website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/wildlife-conservation.git
git push -u origin main
```

If the remote already exists, use:

```bash
git remote set-url origin https://github.com/YOUR-USERNAME/wildlife-conservation.git
git push -u origin main
```

If Git is not configured yet:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 3. Deploy with Vercel

1. Sign in to Vercel with your GitHub account.
2. Choose **Add New → Project**.
3. Import the repository.
4. Since this is a static site, leave the build step empty if needed.
5. Set the output directory to `.` if Vercel asks for it.
6. Deploy and test the live URLs.

### 4. Update after edits

```bash
git add .
git commit -m "Update website content and styles"
git push
```

Vercel will redeploy automatically if the repository is connected.

## Before submission checklist

- [ ] Open all five pages and verify navigation works
- [ ] Check mobile responsiveness in browser dev tools
- [ ] Test the species search and filter functions
- [ ] Complete the quiz and verify the score resets correctly
- [ ] Open the gallery modal and close it using the UI
- [ ] Check demonstration forms for validation and confirmation messages
- [ ] Verify image loading and spelling across all pages
- [ ] Add your name, class, section, or teacher-required details if needed
- [ ] Include references or citations if your project requires factual sourcing

## Suggested submission description

**WildEarth** is a responsive wildlife and nature conservation awareness website created to educate users about threatened species, biodiversity, and meaningful conservation actions. Developed using HTML, CSS, and JavaScript, the project includes a searchable species directory, an interactive conservation page, a visual gallery, a knowledge quiz, and a front-end donation pledge demo to present conservation themes in a user-friendly and engaging format.

## Learning outcome

This project helps students practice:

- building multi-page static websites
- using semantic HTML for content structure
- styling layouts with modern CSS techniques
- creating interactive front-end features with JavaScript
- designing pages with a clear visual identity and purpose
- presenting educational content in an accessible and engaging way
