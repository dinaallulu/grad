const getAssetFileName = (url) => {
    if (!url) return null;
    const fileName = url.split("/").pop();
    return `assets/${fileName}`;
};

const generateImageStyle = (size, alignment) => {
    const sizeStyles = {
        fullWidth: { width: "100%", height: "auto" },
        small: { width: "200px", height: "200px" },
        medium: { width: "400px", height: "400px" },
        large: { width: "600px", height: "600px" },
    };

    const style = {
        ...sizeStyles[size || "medium"],
        display: "block",
        ...(alignment === "center" && { margin: "0 auto" }),
        ...(alignment === "left" && { float: "left", marginRight: "1rem" }),
        ...(alignment === "right" && { float: "right", marginLeft: "1rem" }),
    };

    return Object.entries(style)
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ");
};

export const generateHTMLCode = (formData, content, pages, navigationPages) => {
    const safePages = pages || [];
    const safeNavigationPages = navigationPages || [];
    const safeContent = content || [];

    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <title>${formData.name}'s Homepage</title>
  </head>
  <body>
    <div class="container">
      <div class="personal-info">
        ${
            formData.profileImage
                ? `<img class="profile-img" src="${formData.profileImage}" alt="${formData.name} Profile"/>`
                : ""
        }
        <strong>${formData.name}</strong>
        <p>${formData.bio}</p>

        <div class="social-links">
          ${
              formData.socialLinks.gmail
                  ? `
            <a href="mailto:${formData.socialLinks.gmail}" target="_blank" rel="noopener noreferrer">
              <i class="fas fa-envelope fa-2x"></i>
            </a>`
                  : ""
          }
          ${
              formData.socialLinks.twitter
                  ? `
            <a href="https://twitter.com/${formData.socialLinks.twitter}" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-twitter fa-2x"></i>
            </a>`
                  : ""
          }
          ${
              formData.socialLinks.github
                  ? `
            <a href="https://github.com/${formData.socialLinks.github}" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-github fa-2x"></i>
            </a>`
                  : ""
          }
          ${
              formData.socialLinks.linkedin
                  ? `
            <a href="https://linkedin.com/in/${formData.socialLinks.linkedin}" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-linkedin fa-2x"></i>
            </a>`
                  : ""
          }
          ${
              formData.socialLinks.orcid
                  ? `
            <a href="https://orcid.com/${formData.socialLinks.orcid}" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-orcid fa-2x"></i>
            </a>`
                  : ""
          }
          ${
              formData.socialLinks.researchGate
                  ? `
            <a href="https://researchgate.com/${formData.socialLinks.researchGate}" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-researchgate fa-2x"></i>
            </a>`
                  : ""
          }
        </div>

        <nav>
          <ul>
            ${safeNavigationPages
                .map(
                    (page) => `
              <li>
                <a href="#${page.title}" class="nav-link" data-page="${page.title}">
                  ${page.title}
                </a>
              </li>
            `
                )
                .join("")}
          </ul>
        </nav>
      </div>

      <div class="content-container">
        ${safePages
            .map(
                (page) => `
          <section id="${page.title}" class="page-section">
            ${safeContent
                .filter((block) => block.pageId === page.id)
                .map((block) => {
                    if (block.type) {
                        return generateBlockHTML(block);
                    }
                    return block.content;
                })
                .join("")}
          </section>
        `
            )
            .join("")}
      </div>
    </div>
    <script src="script.js"></script>
  </body>
  </html>
  `;
};

const generateBlockHTML = (block) => {
    switch (block.type) {
        case "single":
            return `
        <div class="content-block">
          ${block.content.header ? `<h2>${block.content.header}</h2>` : ""}
          ${
              block.content.paragraph
                  ? `
            <div class="quill-content">
              ${block.content.paragraph}
            </div>`
                  : ""
          }
          ${
              block.content.imageUrl
                  ? `
            <figure style="margin: 0; padding: 10px;">
              <img src="${getAssetFileName(block.content.imageUrl)}"
                   alt="${block.content.caption || ""}"
                   style="${generateImageStyle(
                       block.content.imageSize,
                       block.content.imageAlignment
                   )}" />
              ${
                  block.content.caption
                      ? `
                <figcaption style="text-align: center; margin-top: 0.5rem;">
                  ${block.content.caption}
                </figcaption>`
                      : ""
              }
            </figure>`
                  : ""
          }
        </div>
      `;

        case "double":
            return `
        <div class="content-block">
          ${block.content.header ? `<h2>${block.content.header}</h2>` : ""}
          ${
              block.content.paragraph
                  ? `
            <div class="quill-content">
              ${block.content.paragraph}
            </div>`
                  : ""
          }
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            ${
                block.content.imageUrl
                    ? `
              <figure style="margin: 0; padding: 10px;">
                <img src="${getAssetFileName(block.content.imageUrl)}"
                     alt="${block.content.caption || ""}"
                     style="${generateImageStyle(
                         block.content.imageSize,
                         block.content.imageAlignment
                     )}" />
                ${
                    block.content.caption
                        ? `
                  <figcaption style="text-align: center; margin-top: 0.5rem;">
                    ${block.content.caption}
                  </figcaption>`
                        : ""
                }
              </figure>`
                    : ""
            }
            ${
                block.content.imageUrl2
                    ? `
              <figure style="margin: 0; padding: 10px;">
                <img src="${getAssetFileName(block.content.imageUrl2)}"
                     alt="${block.content.caption2 || ""}"
                     style="${generateImageStyle(
                         block.content.imageSize2,
                         block.content.imageAlignment2
                     )}" />
                ${
                    block.content.caption2
                        ? `
                  <figcaption style="text-align: center; margin-top: 0.5rem;">
                    ${block.content.caption2}
                  </figcaption>`
                        : ""
                }
              </figure>`
                    : ""
            }
          </div>
        </div>
      `;

        case "triple":
            return `
        <div class="content-block">
          ${block.content.header ? `<h2>${block.content.header}</h2>` : ""}
          ${
              block.content.paragraph
                  ? `
            <div class="quill-content">
              ${block.content.paragraph}
            </div>`
                  : ""
          }
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
            ${[
                {
                    url: block.content.imageUrl,
                    caption: block.content.caption,
                    size: block.content.imageSize,
                    alignment: block.content.imageAlignment,
                },
                {
                    url: block.content.imageUrl2,
                    caption: block.content.caption2,
                    size: block.content.imageSize2,
                    alignment: block.content.imageAlignment2,
                },
                {
                    url: block.content.imageUrl3,
                    caption: block.content.caption3,
                    size: block.content.imageSize3,
                    alignment: block.content.imageAlignment3,
                },
            ]
                .map((img) =>
                    img.url
                        ? `
              <figure style="margin: 0; padding: 10px;">
                <img src="${getAssetFileName(img.url)}"
                     alt="${img.caption || ""}"
                     style="${generateImageStyle(img.size, img.alignment)}" />
                ${
                    img.caption
                        ? `
                  <figcaption style="text-align: center; margin-top: 0.5rem;">
                    ${img.caption}
                  </figcaption>`
                        : ""
                }
              </figure>
            `
                        : ""
                )
                .join("")}
          </div>
        </div>
      `;

        case "publication":
            return `
        <div class="publication-card">
          ${
              block.content.image
                  ? `
            <img src="${getAssetFileName(block.content.image)}" alt="${
                        block.content.title
                    }" />
          `
                  : ""
          }
          <div class="publication-content">
            <h3>${block.content.title || ""}</h3>
            <div class="publication-description">
              ${block.content.paragraph || ""}
            </div>
            <div class="publication-links">
              ${
                  block.content.youtubeLink
                      ? `
                <a href="${block.content.youtubeLink}" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-youtube"></i>
                </a>`
                      : ""
              }
              ${
                  block.content.articleLink
                      ? `
                <a href="${block.content.articleLink}" target="_blank" rel="noopener noreferrer">
                  <i class="fas fa-newspaper"></i>
                </a>`
                      : ""
              }
              ${
                  block.content.githubLink
                      ? `
                <a href="${block.content.githubLink}" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-github"></i>
                </a>`
                      : ""
              }
              ${
                  block.content.pdfLink
                      ? `
                <a href="${block.content.pdfLink}" target="_blank" rel="noopener noreferrer">
                  <i class="fas fa-file-pdf"></i>
                </a>`
                      : ""
              }
            </div>
          </div>
        </div>
      `;

        case "teaching":
            return `
        <div class="course-card">
          <h3>${block.content.courseName || ""}</h3>
          <div class="course-description">
            ${block.content.description || ""}
          </div>
          <div class="course-links">
            ${
                block.content.youtubeLink
                    ? `
              <a href="${block.content.youtubeLink}" target="_blank" rel="noopener noreferrer" class="course-link">
                <i class="fab fa-youtube"></i>
                <span>Course Videos</span>
              </a>`
                    : ""
            }
            ${
                block.content.syllabusLink
                    ? `
              <a href="${block.content.syllabusLink}" target="_blank" rel="noopener noreferrer" class="course-link">
                <i class="fas fa-file-alt"></i>
                <span>Syllabus</span>
              </a>`
                    : ""
            }
            ${
                block.content.contactLink
                    ? `
              <a href="${block.content.contactLink}" target="_blank" rel="noopener noreferrer" class="course-link">
                <i class="fas fa-envelope"></i>
                <span>Contact</span>
              </a>`
                    : ""
            }
          </div>
        </div>
      `;

        default:
            return "";
    }
};

export const generateJSCode = () => {
    return `
  document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    // Hide all sections except the first one initially
    sections.forEach((section, index) => {
      if (index !== 0) section.style.display = 'none';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('data-page');

        // Update active state of nav links
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Show/hide sections
        sections.forEach(section => {
          section.style.display = section.id === targetPage ? 'block' : 'none';
        });
      });
    });

    // Set first nav link as active
    if (navLinks.length > 0) {
      navLinks[0].classList.add('active');
    }
  });

  // Carousel functionality
  document.querySelectorAll('.carousel-container').forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevButton = carousel.querySelector('.carousel-button.prev');
    const nextButton = carousel.querySelector('.carousel-button.next');

    let currentSlide = 0;

    const showSlide = (index) => {
      slides.forEach(slide => slide.removeAttribute('data-active'));
      slides[index].setAttribute('data-active', true);
    };

    prevButton.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });

    nextButton.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  });
  `;
};

export const generateCSSCode = (styles) => {
    return `
  body {
    font-family: ${styles.font};
    color: ${styles.color};
    background-color: ${styles.backgroundColor};
    margin: 0;
    padding: 0;
  }
  p > a {
    color: inherit;
    text-decoration: none;
  }

  .container {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .personal-info {
    width: 300px;
    padding: 20px;
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .profile-img {
    width: 280px;
    height: 200px;
    border-radius: 10px;
    margin-bottom: 20px;
    object-fit: cover;
  }

  .social-links {
    display: flex;
    gap: 15px;
    margin: 20px 0;
    flex-wrap: wrap;
  }

  .social-links a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .social-links a:hover {
    color: ${styles.hoverColor};
  }

  nav ul {
    list-style: none;
    padding: 0;
  }

  nav ul li {
    margin: 10px 0;
  }

  .nav-link {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s;
  }

  .nav-link.active {
    font-weight: bold;
    color: ${styles.hoverColor};
  }

  .content-container {
    flex: 1;
    padding: 20px;
    max-width: 800px;
  }

  .content-container a {
    color: ${styles.color};
    text-decoration: none;
    transition: opacity 0.3s ease;
    font-weight: 600;
  }

  .content-container a:hover {
    opacity: 0.7;
    color: ${styles.hoverColor} !important;s
  }

  .content-container p a {
    color: ${styles.color} !important;
  }

  .publication-card {
    display: flex;
    gap: 20px;
    padding: 20px;
    margin: 20px 0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    background: white;
  }

  .publication-card img {
    width: 200px;
    height: 250px;
    object-fit: cover;
    border-radius: 4px;
  }

  .publication-content {
    flex: 1;
  }

  .publication-links {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .publication-links a {
    color: inherit;
    text-decoration: none;
  }

  .publication-card a,
  .carousel-container a {
    color: ${styles.color};
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }

    .personal-info {
      width: 100%;
      height: auto;
      position: static;
    }
  }

  /* Quill content styles */
  .quill-content a {
    color: ${styles.color} !important;
    text-decoration: none;
    transition: opacity 0.3s ease;
  }

  .quill-content a:hover {
    opacity: 0.7;
  }

  /* Override any Quill default styles */
  .ql-editor a {
    color: ${styles.color} !important;
  }

  /* Ensure links in HTML content also match */
  [class*="ql"] a {
    color: ${styles.color} !important;
  }

  /* Carousel styles */
  .carousel-container {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
    margin: 20px 0;
  }

  .carousel-slides {
    height: 100%;
    position: relative;
  }

  .carousel-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .carousel-slide[data-active="true"] {
    opacity: 1;
  }

  .carousel-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .carousel-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    text-align: center;
  }

  .carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }

  .carousel-button.prev { left: 10px; }
  .carousel-button.next { right: 10px; }

  /* Publication Card Styles */
  .publication-card {
    margin: 20px 0;
    padding: 25px;
    border-radius: 10px;
    display: flex;
    gap: 20px;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.03) 0px 1px 7px;
  }

  .publication-card img {
    width: 200px;
    height: 250px;
    object-fit: cover;
    border-radius: 5px;
  }

  .publication-content {
    flex: 1;
  }

  .publication-links {
    display: flex;
    gap: 15px;
    margin-top: 15px;
  }

  .publication-links a {
    color: inherit;
    font-size: 1.2em;
    transition: opacity 0.3s;
  }

  .publication-links a:hover {
    opacity: 0.7;
  }

  /* Course Card Styles */
  .course-card {
    margin: 20px 0;
    padding: 25px;
    border-radius: 10px;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.03) 0px 1px 7px;
  }

  .course-card h3 {
    font-weight: 500;
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
    margin-bottom: 15px;
  }

  .course-description {
    margin-bottom: 20px;
    color: rgba(0, 0, 0, 0.79);
    padding: 0 0.5rem;
  }

  .course-links {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    opacity: 0.9;
  }

  .course-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid currentColor;
    border-radius: 4px;
    transition: opacity 0.3s;
    text-decoration: none;
    color: inherit;
  }

  .course-link:hover {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    .publication-card {
      flex-direction: column;
    }

    .publication-card img {
      width: 100%;
      height: auto;
    }

    .course-links {
      flex-direction: column;
    }
  }
  `;
};
