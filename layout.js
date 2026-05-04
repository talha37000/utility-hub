document.addEventListener("DOMContentLoaded", () => {

    const currentScript = document.currentScript;
    const scriptSrc = currentScript ? currentScript.getAttribute("src") : "layout.js";
    const prefix = scriptSrc.replace(/layout\.js$/, "");

    const layoutStyles = `
nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.85rem;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 16px 30px rgba(15, 23, 42, 0.08);
    position: sticky;
    top: 0;
    z-index: 999;
}
nav .right {
    display: flex;
    align-items: center;
    gap: 0.85rem;
}
nav .dropdown {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
}
nav .dropdown a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: #0f172a;
    text-decoration: none;
    font-weight: 600;
}
nav .logo {
    height: 48px;
    width: auto;
}
.search-box {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 1rem;
    border-radius: 999px;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
}
.search-box input {
    border: none;
    outline: none;
    background: transparent;
    color: #0f172a;
    min-width: 170px;
}
.search-box button {
    border: none;
    background: transparent;
    color: #0f172a;
    cursor: pointer;
    font-size: 1rem;
}
.footer {
    width: 100%;
    background: #1e293b;
    color: #e2e8f0;
    padding: 3rem 1.5rem 1.5rem;
}
.footer a {
    color: #93c5fd;
    text-decoration: none;
}
.footer .mainfooter {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 1.5rem;
    align-items: start;
}
.footer .mainfooter h2 {
    margin-bottom: 1rem;
}
.footer .bottom {
    margin-top: 1.75rem;
    text-align: center;
    color: #cbd5e1;
    font-size: 0.95rem;
}
@media (max-width: 900px) {
    nav, .footer .mainfooter {
        flex-direction: column;
        align-items: flex-start;
    }
    .footer .mainfooter {
        grid-template-columns: 1fr;
    }
}
`;

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