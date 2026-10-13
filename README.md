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
| `docs/images/`        | Photos used on the pages                     |
| `docs/404.html`       | Page shown for missing URLs                  |
| `docs/CNAME`          | Custom domain for GitHub Pages               |

To change the site, edit the files in `docs/` and merge to `main`. GitHub Pages
publishes the change within a few minutes.

## Preview locally

```bash
python3 -m http.server 8080 -d docs
```

Then open <http://localhost:8080>.
