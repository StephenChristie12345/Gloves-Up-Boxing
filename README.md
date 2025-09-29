# Gloves Up Boxing Gym Website

## Project Overview
This project is a **multi-page responsive website** for Gloves Up Boxing Gym.  
It was developed as part of the **WEDES0200** module to demonstrate the use of **HTML5, CSS3, and responsive design principles**.

---

## Site Pages
1. **Home** – Hero section, welcome text, and navigation to the rest of the site.  
2. **About Us** – Background of the gym, including founders and community vision.  
3. **Schedules** – Training schedules presented in a styled table format.  
4. **Join Us** – Membership and youth information, with a gallery and enquiry buttons.  
5. **Donate** – Donation options and call to action for supporters.  
6. **Stories** – Testimonials from members, parents, and coaches.  
7. **Contact** – Contact details, volunteer/donate cards, and a Google Maps embed.  

---

## Design Goals
The design goal was to make the site **modern, accessible, consistent, and responsive**, while showcasing CSS features such as:  
- Grid  
- Flexbox  
- Pseudo-classes  
- Media queries  

---

## Changelog (Detailed Work Log)

### Week 1 – Setting up structure and base styling
**Day 1 (Monday)**  
- Created GitHub repository and pushed the initial commit with HTML skeletons.  
- Built folder structure:  
  - `/assets` for images and icons  
  - `/styles.css` for centralised styling  
- Created consistent HTML structure across all pages (`header`, `nav`, `main`, `footer`).  
- Linked `styles.css` to all HTML files to ensure one stylesheet controlled the site.  

**Day 2 (Tuesday)**  
- Defined global variables in `:root` for colours, typography, spacing, and shadows.  
  Example: `--bg` (background), `--ink` (text), `--accent` (highlights).  
- Applied base styles:  
  - Reset margins and paddings for `html, body`.  
  - Background set to dark theme `#111`, text to off-white.  
  - Chose system-UI stack for modern fonts.  
- Added navigation bar using Flexbox (`.nav__list { display:flex; justify-content:space-evenly; }`).  
- Styled navigation links with hover, focus, and `aria-current` states for accessibility.  

**Day 3 (Wednesday)**  
- Built **hero section** for Home page with large background image (`background:url(...) center/cover`).  
- Added overlay using `::before` for readability.  
- Used `clamp()` function for hero titles (responsive scaling).  
- Created **button system**:  
  - `.btn` (base style)  
  - `.btn.join`, `.btn.download` (contextual colours)  
- Implemented hover/focus pseudo-classes for feedback.  

---

### Week 2 – Layouts, components, and decoration
**Day 4 (Monday)**  
- Applied CSS Grid for layouts:  
  - `.gallery-2` (Join Us – two-column gallery).  
  - `.testimonials` (Stories – testimonial cards).  
  - `.contact-grid` (Contact – volunteer/main/donate cards).  
- Used Flexbox for button rows and nav distribution.  
- Standardised section spacing with `--space-*` scale.  

**Day 5 (Tuesday)**  
- Styled **training schedule table**:  
  - Collapsed borders, alternating row colours.  
  - Added box-shadow and border-radius.  
- Applied decoration:  
  - Rounded corners on cards/images.  
  - Drop shadows for depth.  
- Standardised typography hierarchy:  
  - Bold, accent-coloured headings.  
  - Readable line height for paragraphs.  
  - Italics for quotes/testimonials.  

**Day 6 (Wednesday)**  
- Completed **Stories page cards**:  
  - Image top, italic text middle, attribution bottom.  
  - `object-fit:cover` with hover effect.  
- Added **CTA button**: “Share Your Story”.  
- Designed **Donate page**:  
  - Grid layout for donation options.  
  - Highlighted CTA button for donations.  

---

### Week 3 – Responsive design, fixes, and improvements
**Day 7 (Monday)**  
- Added responsive media queries:  
  - `@media (max-width:60em)` – tablets  
  - `@media (max-width:45em)` – mobile  
- Nav bar collapses into toggle menu on mobile (`.nav__toggle`).  
- Hero sections adjusted:  
  - Reduced height on small screens.  
  - Title scaling with variables.  

**Day 8 (Tuesday)**  
- Fixed **Join Us gallery** cropping issue:  
  - Changed `object-fit:cover` → `contain`.  
  - Set `height:auto`.  
- Restored CTA button on Stories page.  
- Corrected **Contact page cards** (re-added `.c-card` styles).  

**Day 9 (Wednesday)**  
- Improved usability and visuals:  
  - Increased Google Maps iframe height `22rem → 28rem`.  
  - Fixed Stories image cropping with `object-position:top`.  
- Final responsive testing:  
  - Desktop: aligned sections, full-width heroes.  
  - Tablet: grids collapse cleanly.  
  - Mobile: nav toggle works, stacked cards.  
- Pushed final commits:  
  - “Added responsive nav toggle”  
  - “Fixed Join Us gallery image cropping”  
  - “Increased Google Maps height for Contact page”  
  - “Adjusted testimonial image positioning”  

---

## Technologies Used
- **HTML5** – semantic tags (`header`, `nav`, `main`, `section`).  
- **CSS3** – Flexbox, Grid, pseudo-classes, variables, shadows, media queries.  
- **Git & GitHub** – version control, multiple descriptive commits.  

---

## References
- Module Guide (**WEDES0200/p/w**)  
- Assignment Brief (**Part 2: CSS Styling and Responsive Design**)  
- [MDN Web Docs](https://developer.mozilla.org/) – CSS references  

---

## GitHub Repository
🔗 *(Insert your repository link here)*  


 
