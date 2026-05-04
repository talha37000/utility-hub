from pathlib import Path
import re
import os

root = Path('.').resolve()
ignore = {'navbar.html', 'footer.html'}

html_files = [p for p in root.rglob('*.html') if p.name not in ignore]
changed = []

for path in html_files:
    text = path.read_text(encoding='utf-8')
    original = text

    body_match = re.search(
        r'(<body[^>]*>)(.*?)(</body>)', text, flags=re.S | re.I)
    if not body_match:
        continue

    open_body, body_content, close_body = body_match.groups()

    # Remove only the navbar block; preserve other header content
    body_content = re.sub(r'<nav\b[^>]*>.*?</nav>',
                          '', body_content, flags=re.S | re.I)
    body_content = re.sub(
        r'<header\b[^>]*>(\s*\n)*', '', body_content, flags=re.S | re.I)
    body_content = re.sub(r'(\s*\n)*</header>', '',
                          body_content, flags=re.S | re.I)

    # Remove footer block at end of the body if present
    body_content = re.sub(
        r'<div\s+class=["\']footer["\'][^>]*>.*$', '', body_content, flags=re.S | re.I)

    # Add navbar placeholder at the top
    if '<div id="navbar"></div>' not in body_content:
        body_content = '    <div id="navbar"></div>\n\n' + \
            body_content.lstrip('\n')

    # Add footer placeholder before the closing body if missing
    if '<div id="footer"></div>' not in body_content:
        body_content = body_content.rstrip() + '\n\n    <div id="footer"></div>\n'

    # Add layout.js script before closing body if missing
    rel_path = os.path.relpath(
        str(root / 'layout.js'), start=str(path.parent)).replace('\\', '/')
    if f'<script src="{rel_path}"></script>' not in body_content:
        body_content = body_content.rstrip(
        ) + f'\n    <script src="{rel_path}"></script>\n'

    new_body = f"{open_body}\n{body_content}{close_body}"
    text = text[:body_match.start()] + new_body + text[body_match.end():]

    if text != original:
        path.write_text(text, encoding='utf-8')
        changed.append(str(path.relative_to(root)))

print(f"Updated {len(changed)} HTML files:")
for f in changed:
    print(f)
