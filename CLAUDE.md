# Bee Positive Apiary website

Plain HTML and CSS in `docs/`, served by GitHub Pages from `main`, folder
`/docs`, at https://beepositiveapiary.com. There is no build step and no
Jekyll (`docs/.nojekyll`). Use absolute paths (`/style.css`, `/images/...`)
so `404.html` works at any URL depth.

Preview locally with `python3 -m http.server 8080 -d docs`.

## Keep these in step when editing

- **Sitemap:** when you change a page, update its `<lastmod>` date in
  `docs/sitemap.xml`. When you add a page, add it there too.
- **Prices:** prices on `docs/products.html` also appear in the page's
  structured data (the `application/ld+json` block in its `<head>`), which is
  what Google reads. Change both when a price changes. The `LocalBusiness`
  block is repeated on the home and products pages, so change both copies.
- **Photos:** each photo has a JPEG (the fallback, also used for `og:image`
  link previews) and WebP copies at two widths named like
  `honey-1lb-600.webp`, served through `<picture>` with `srcset`. When adding
  a photo, make the WebP copies too, for example
  `cwebp -q 80 -resize 600 0 photo.jpg -o photo-600.webp`, and give the
  `<img>` its real `width` and `height`.
- **Shared markup:** the `<head>` links, header, and footer are copied into
  every page, including `404.html`. A change to one usually belongs in all.

## Style

- Colors come from the jar label and are defined as variables in `:root` in
  `docs/style.css`: navy, gold, cream, and orange. Orange is decorative only;
  it fails contrast as text on cream.
- The wordmark font is Dancing Script, self-hosted in `docs/fonts/` under the
  SIL Open Font License. Keep its license file with it. Don't add fonts or
  scripts from third-party CDNs.
- Don't publish a street address; the site gives only the towns (Easton and
  Norton, MA).
