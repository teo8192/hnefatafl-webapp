### Running

First time setup:
From project root:
```sh
npm init wasm-app www
```
We need this server to reference our files, so add the following three lines right before the `devDependencies` item in the `www/package.json` file.
```json
  "dependencies": {
    "hnefatafl-webapp": "file:../pkg"
  },
```
Then we need to delete the files `www/index.js` and `www/index.html`, and create links for them instead (symlinks did not work)
```sh
rm www/index.js www/index.html
ln webpage/index.js www
ln webpage/index.html www
```

Now it can be started:
```sh
cd www
npm install
npm run start
```

If you get some error when running relating to some hash function or something, then you probably have a too new version of node I think.
Use `nvm` to downgrade:
```sh
nvm install 16
```
or if you already have it installed
```sh
nvm use 16
```

### Build with `wasm-pack build`

```
wasm-pack build
```

### Test in Headless Browsers with `wasm-pack test`

```
wasm-pack test --headless --firefox
```

## License

Licensed under either of

* Apache License, Version 2.0, ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
* MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

at your option.

### Contribution

Unless you explicitly state otherwise, any contribution intentionally
submitted for inclusion in the work by you, as defined in the Apache-2.0
license, shall be dual licensed as above, without any additional terms or
conditions.
