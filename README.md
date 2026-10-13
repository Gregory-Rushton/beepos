# Bee Positive Apiary website

The website for [Bee Positive Apiary](https://beepositiveapiary.com), a small,
family-run apiary in Easton, MA. The site introduces the apiary and lists our
honey and other products, with links for buying them. For now it is a static
site; we plan to add more features over time.

## How it works

The site is plain HTML and CSS in [`docs/`](docs/), with no build step.
GitHub Pages serves it from the `main` branch, `/docs` folder, at
<https://beepositiveapiary.com>.

| File                  | What it is                                   |
|-----------------------|----------------------------------------------|
| `docs/index.html`     | Home page                                    |
| `docs/products.html`  | Products page with links for buying          |
| `docs/style.css`      | Shared styles                                |
| `docs/images/`        | Photos: original JPEGs plus WebP sizes (see below) |
| `docs/fonts/`         | Dancing Script (wordmark font) and its license |
| `docs/404.html`       | Page shown for missing URLs; forwards old Weebly store links |
| `docs/sitemap.xml`    | Page list for search engines                 |
| `docs/robots.txt`     | Points search engines at the sitemap         |
| `docs/CNAME`          | Custom domain for GitHub Pages               |

When you change a page, update its `<lastmod>` date in `docs/sitemap.xml`. When
you add a page, add it there too.

Prices on the products page also appear in the page's structured data (the
`application/ld+json` block in its `<head>`), which is what Google reads.
Change both when a price changes.

Each photo has a JPEG (used as the fallback and for link previews) and WebP
copies at two widths named like `honey-1lb-600.webp`, which browsers load
instead. To add a photo, make the WebP copies too, for example with
`cwebp -q 80 -resize 600 0 photo.jpg -o photo-600.webp`.

To change the site, edit the files in `docs/` and merge to `main`. GitHub Pages
publishes the change within a few minutes.

## Preview locally

```bash
python3 -m http.server 8080 -d docs
```

Then open <http://localhost:8080>.
