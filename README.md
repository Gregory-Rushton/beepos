# Bee Positive Apiary website

The live site is plain HTML in [`docs/`](docs/). GitHub Pages serves it from the
`main` branch, `/docs` folder, at <https://beepositiveapiary.com>.

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

---

# Legacy React app (not in use)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Environment Variables
Create a .env file in root and populate it like this:
```env
REACT_APP_TAX=0.0625
REACT_APP_BACKEND_URL=http://localhost:3001
REACT_APP_FRONTEND_URL=http://localhost:3000
REACT_APP_CDN_URL=https://cdn.example.com
REACT_APP_COOKIE_DOMAIN=localhost
```
