document.addEventListener("DOMContentLoaded", () => {

    // ── 1. Detect path prefix (works for nested folders) ──
    const currentScript = document.currentScript || document.querySelector('script[src*="layout.js"]');
    const scriptSrc = currentScript ? currentScript.getAttribute("src") : "layout.js";
    const prefix = scriptSrc.replace(/layout\.js$/, "");

    // ── 2. Fix all internal paths automatically ──
    function fixPaths(container) {
        container.querySelectorAll("[href], [src], [action]").forEach(el => {
            ["href", "src", "action"].forEach(attr => {
                const value = el.getAttribute(attr);
                if (!value) return;

                // skip external links
                if (
                    value.startsWith("http") ||
                    value.startsWith("#") ||
                    value.startsWith("mailto:") ||
                    value.startsWith("tel:") ||
                    value.startsWith("data:")
                ) return;

                el.setAttribute(attr, prefix + value);
            });
        });
    }

    // ── 3. Inject content with fallback ──
    function inject(elementId, file, fallbackTemplate) {
        const el = document.getElementById(elementId);
        if (!el) return;

        fetch(prefix + file)
            .then(res => {
                if (!res.ok) throw new Error(file + " not found");
                return res.text();
            })
            .then(html => {
                el.innerHTML = html;
                fixPaths(el);
            })
            .catch(err => {
                console.warn(file + " failed, using fallback", err);
                el.innerHTML = fallbackTemplate;
                fixPaths(el);
            });
    }

    // ── 4. NAVBAR TEMPLATE (fallback) ──
    const navbarTemplate = `
    <nav>
        <div class="right">
            <i class="fa-solid fa-bars"></i>
            <span>Quick Links</span>
            <div class="dropdown">
                <a href="index.html">Home</a>
                <a href="AboutUs.html">About Us</a>
                <a href="contactUs.html">Contact</a>
            </div>
        </div>

        <a href="index.html">
            <img class="logo" src="media/gemini-svg.svg" alt="logo">
        </a>

        <form class="search-box" action="search.html">
            <input type="text" name="q" placeholder="Search..." required>
            <button type="submit">🔍</button>
        </form>
    </nav>`;

    // ── 5. FOOTER TEMPLATE (fallback) ──
    const footerTemplate = `
    <div class="footer">
        <div class="mainfooter">
            <div>
                <h2>Utility Hub</h2>
                <p>All tools in one place.</p>
            </div>
            <div>
                <h2>Explore</h2>
                <a href="index.html">Home</a>
                <a href="AboutUs.html">About</a>
            </div>
        </div>
        <div class="bottom">© 2026 Utility Hub</div>
    </div>`;

    // ── 6. Inject both ──
    inject("navbar", "navbar.html", navbarTemplate);
    inject("footer", "footer.html", footerTemplate);

});