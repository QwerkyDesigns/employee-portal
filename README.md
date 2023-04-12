# Welcome to Qwerky Studio

This app intended to facilitate image coordination between various AI image generators, as well as a site builder store such as SquareSpace. This is a living project and we're not 100% sure of its direction, but the motivation came from me wanting to set up a squarespace store to sell products that featured artwork I'd created using Dall-E. From there, its anyone's guess. But Im' sure we can make something interesting out of it 🛩️

## Development

### Important Scripts

#### `npm run boostrap`

Used solely for fulfilling dependencies of the project.

This can mean RubyGems, npm packages, Homebrew packages, Ruby versions, Git submodules, etc.

#### `npm run setup`

Used to set up a project in an initial state. This is typically run after an initial clone, or, to reset the project back to its initial state.

#### `npm run update`

Used to update the project after a fresh pull.

If you have not worked on the project for a while, running script/update after a pull will ensure that everything inside the project is up to date and ready to work.

#### `npm run server`

Used to start the application.

#### `npm run test`

Used to run the test suite of the application.

#### `npm run cibuild`

Used to build the app on the CI server

### Getting started

Run the following in a shell session in the root directory of the project

```sh
npm run setup
```

### Notes

https://jameschambers.co.uk/nextjs-hot-reload-docker-development

https://logfetch.com/next-stripe-cli-docker-integration/

### Create a nextauth secret

In a unix shell, run:

```bash
openssl rand -base64 32
```

### Create a jwt secret

```bash

npm i -g node-jose-tools

jose newkey -s 512 -t oct -a HS512

{"kty":"oct","kid":"KXoO1b0ICvab1DaFv9QQZzc-ovytffZL6jy10-Xwp5s","alg":"HS512","k":"afcxWrRByVGKegtf0VM257I_WCy_06qtG1lecV3HAQLyNPIwgrtLI9rXDDmcpVu8HI9ReiL0QOx90EUT4zA3cg"}
```
