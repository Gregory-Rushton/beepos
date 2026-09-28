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

## GitHub Pages setup (one time)

1. In **Settings > Pages**, set **Source** to "Deploy from a branch", branch `main`, folder `/docs`.
2. Set **Custom domain** to `beepositiveapiary.com`. (`docs/CNAME` holds the same value.)
3. At the DNS provider, add these records for the apex domain:

   | Type  | Host  | Value                     |
   |-------|-------|---------------------------|
   | A     | `@`   | `185.199.108.153`         |
   | A     | `@`   | `185.199.109.153`         |
   | A     | `@`   | `185.199.110.153`         |
   | A     | `@`   | `185.199.111.153`         |
   | AAAA  | `@`   | `2606:50c0:8000::153`     |
   | AAAA  | `@`   | `2606:50c0:8001::153`     |
   | AAAA  | `@`   | `2606:50c0:8002::153`     |
   | AAAA  | `@`   | `2606:50c0:8003::153`     |
   | CNAME | `www` | `gregory-rushton.github.io` |

4. After DNS resolves, turn on **Enforce HTTPS** in **Settings > Pages**.
