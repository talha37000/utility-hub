document.addEventListener("DOMContentLoaded", () => {

    const currentScript = document.currentScript;
    const scriptSrc = currentScript ? currentScript.getAttribute("src") : "layout.js";
    const prefix = scriptSrc.replace(/layout\.js$/, "");

    const layoutStyles = `
body {
    padding-top: 60px;
}

/* NAVIGATION */
nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    padding: 0 15px;
    gap: 10px;
}

.logo {
    width: 130px;
    height: 130px;
    object-fit: contain;
}

.right {
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
}

.right:hover {
    color: #2563eb;
}

.right:hover .dropdown {
    display: flex;
}

.dropdown {
    display: none;
    flex-direction: column;
    background-color: #ffffff;
    position: absolute;
    top: 100%;
    left: 0;
    width: 160px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    overflow: hidden;
    z-index: 200;
}

.dropdown a {
    text-decoration: none;
    padding: 10px 12px;
    font-size: 16px;
    color: #1f2937;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    gap: 8px;
}

.dropdown a:last-child {
    border-bottom: none;
}

.dropdown a:hover {
    background-color: #2563eb;
    color: #ffffff;
}

.fa-solid {
    padding: 5px;
}

.fa-house {
    color: #2563eb;
}

.search-box {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 20px;
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
}

.search-box input {
    border: none;
    outline: none;
    background: transparent;
    color: #0f172a;
    font-size: 14px;
    min-width: 150px;
}

.search-box button {
    border: none;
    background: transparent;
    color: #0f172a;
    cursor: pointer;
    font-size: 1rem;
}

/* FOOTER */
.footer {
    width: 100%;
    background-color: #1e293b;
    margin-top: 40px;
}

.mainfooter {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 40px;
    padding: 40px 5%;
    align-items: start;
}

.footer .name h2,
.footer .explore h2,
.footer .populartools h2 {
    font-size: 20px;
    color: #ffffff;
    margin-bottom: 15px;
}

.footer .name p,
.footer .stayconnected p {
    color: #cbd5e1;
    font-size: 15px;
    line-height: 1.5;
}

.explore a, .populartools a {
    display: block;
    color: #93c5fd;
    text-decoration: none;
    margin-bottom: 10px;
    font-size: 15px;
    transition: color 0.2s;
}

.explore a:hover, .populartools a:hover {
    color: #60a5fa;
}

.stayconnected {
    text-align: center;
    padding: 20px 5%;
    border-top: 1px solid #334155;
}

.bottom {
    text-align: center;
    padding: 20px 5%;
    color: #94a3b8;
    font-size: 14px;
    border-top: 1px solid #334155;
}

@media (max-width: 900px) {
    nav {
        flex-wrap: wrap;
        height: auto;
        padding: 10px 15px;
    }
    .logo {
        width: 80px;
        height: 80px;
    }
    .mainfooter {
        grid-template-columns: 1fr;
        gap: 20px;
    }
}`;

    if (!document.getElementById("layout-shared-styles")) {
        const styleEl = document.createElement("style");
        styleEl.id = "layout-shared-styles";
        styleEl.textContent = layoutStyles;
        document.head.appendChild(styleEl);
    }

    const navbarTemplate = `
<nav>
    <div class="right">
        <i class="fa-solid fa-bars"></i>
        <span>Quick Links</span>
        <div class="dropdown">
            <a href="index.html"><i class="fa-solid fa-house"></i><span> Home</span></a>
            <a href="AboutUs.html"><i class="fa-solid fa-circle-info"></i><span> About Us</span></a>
            <a href="contactUs.html"><i class="fa-solid fa-phone"></i><span> Contact Us</span></a>
        </div>
    </div>
    <a href="index.html">
        <img class="logo" src="media/gemini-svg.svg" alt="logo">
    </a>
    <form class="search-box" action="search.html">
        <input type="text" name="q" placeholder="Search tools..." required>
        <button type="submit">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
    </form>
</nav>`;

    const footerTemplate = `
<div class="footer">
    <div class="mainfooter">
        <div class="name">
            <h2>Utility Hub</h2>
            <p>Simplifying everyday tasks with smart, fast, and reliable tools — all in one place.</p>
        </div>
        <div class="explore">
            <h2>Explore</h2>
            <a href="index.html"><span>Home</span></a>
            <a href="index.html#heading"><span>All Tools</span></a>
            <a href="AboutUs.html">Features</a>
            <a href="contactUs.html">Contact</a>
        </div>
        <div class="populartools">
            <h2>Popular Tools</h2>
            <a href="basic calculator/index.html">Calculator</a>
            <a href="BMI CALCULATOR/INDEX.HTML">BMI Calculator</a>
            <a href="CURRENCY CONVERTER/INDEX.HTML">Currency Convertor</a>
            <a href="RANDOM PASSWORD GENERATOR/index.html">Password Generator</a>
        </div>
    </div>
    <div class="stayconnected">
        <p>Follow Us For More Updates And New Tools</p>
    </div>
    <div class="bottom">
        <p>© 2026 Utility Hub • Built with simplicity in mind</p>
    </div>
</div>`;

    const fixAttributes = (container, selectors, attrs) => {
        container.querySelectorAll(selectors).forEach(el => {
            attrs.forEach(attr => {
                const value = el.getAttribute(attr);
                if (!value) return;
                if (value.startsWith("http") || value.startsWith("https") || value.startsWith("mailto:") || value.startsWith("tel:") || value.startsWith("#")) return;
                el.setAttribute(attr, prefix + value);
            });
        });
    };

    const injectContent = (element, filePath, template, fixFn) => {
        if (!element) return;
        fetch(prefix + filePath)
            .then(res => {
                if (!res.ok) throw new Error(`${filePath} not found`);
                return res.text();
            })
            .then(html => {
                element.innerHTML = html;
                fixFn(element);
            })
            .catch(err => {
                console.warn(`${filePath} load failed, using fallback template.`, err);
                element.innerHTML = template;
                fixFn(element);
            });
    };

    injectContent(
        document.getElementById("navbar"),
        "navbar.html",
        navbarTemplate,
        el => fixAttributes(el, "a[href], img[src], form[action]", ["href", "src", "action"])
    );

    injectContent(
        document.getElementById("footer"),
        "footer.html",
        footerTemplate,
        el => fixAttributes(el, "a[href]", ["href"])
    );

});