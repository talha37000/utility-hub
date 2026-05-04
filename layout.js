document.addEventListener("DOMContentLoaded", () => {

    // Detect how deep the current page is relative to root
    // e.g. "basic calculator/index.html" is 1 level deep → prefix = "../"
    const depth = (window.location.pathname.match(/\//g) || []).length - 1;
    const prefix = depth > 0 ? "../".repeat(depth) : "";

    // Inject NAVBAR
    const navbarEl = document.getElementById("navbar");
    if (navbarEl) {
        fetch(prefix + "navbar.html")
            .then(res => {
                if (!res.ok) throw new Error("navbar.html not found");
                return res.text();
            })
            .then(html => {
                navbarEl.innerHTML = html;

                // Fix all links & src inside navbar to use correct prefix
                navbarEl.querySelectorAll("a[href], img[src], form[action]").forEach(el => {
                    if (el.href && !el.href.startsWith("http")) {
                        el.setAttribute("href", prefix + el.getAttribute("href"));
                    }
                    if (el.src && !el.src.startsWith("http")) {
                        el.setAttribute("src", prefix + el.getAttribute("src"));
                    }
                    if (el.action && !el.action.startsWith("http")) {
                        el.setAttribute("action", prefix + el.getAttribute("action"));
                    }
                });
            })
            .catch(err => console.error("Navbar load failed:", err));
    }

    // Inject FOOTER
    const footerEl = document.getElementById("footer");
    if (footerEl) {
        fetch(prefix + "footer.html")
            .then(res => {
                if (!res.ok) throw new Error("footer.html not found");
                return res.text();
            })
            .then(html => {
                footerEl.innerHTML = html;

                // Fix all links inside footer
                footerEl.querySelectorAll("a[href]").forEach(el => {
                    const href = el.getAttribute("href");
                    if (href && !href.startsWith("http") && !href.startsWith("#")) {
                        el.setAttribute("href", prefix + href);
                    }
                });
            })
            .catch(err => console.error("Footer load failed:", err));
    }

});