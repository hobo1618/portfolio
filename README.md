# My portfolio



This is a small sample of work I've completed in the past, all included in this monorepo. The repo uses [pnpm](https://pnpm.io) as a package manager and includes the following packages/apps:

## Apps and Packages

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/), with the exception of the background remover, which is written in python and leverages NumPy and OpenCV as principal libraries for image manipulation.

### Image Gallery (coming soon...)
You'll find this project in [`apps/image-gallery`](). The gallery is unique in that it displays images in a bin-packing arrangement. Users can also sort and filter images by size and tag. Libraries and frameworks used to create this page:
- Nextjs
- react-query
- Zustand

### Background remover (coming soon...)
You'll find this app in [`apps/background-remover`](). Developed for the purpose of removing backgrounds from images of furniture for a side project I’m working on with some folks, the background remover works in the browser by calling an API built with flask. The background remover itself is a python script which runs an ML model developed by some very smart individuals right here. The next step is to develop some additional training data and use pytorch to improve the results. If you want to test it for yourself, message me and I’ll send you an API key for a couple of runs.

### Whiteboard (coming soon...)
You'll find this app in [`apps/whiteboard`](). A digital whiteboard built with react and fabricjs. Fabric js is a vanilla JS library for interacting with the html canvas element in 2D. The major challenge with this project was determining how to implement direct dom-manipulations in react. The solution was ultimately was to write all the whiteboard code inside of a large useeffect hook and extract that logic into several custom hooks. This is a pretty typical pattern when dealing directly with the DOM in react apps.   

### Binpacking Layout (coming soon...)
You'll find this component in [`ui/binpacking-layout`](). This component takes in an array of images and their respective dimensions and outputs an image gallery with a unique, slightly chaotic layout. The algorithm was heavily influenced from [this algorithm](https://codeincomplete.com/articles/bin-packing/), which uses a first-fit decreasing algorithm to place blocks into a container of a flexible size. I adapted and extended the algorithm handle large volumes of blocks (i.e. images) while maintaining the gallery's aesthetics and performance. 

## Using this turborepo:

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
pnpm dlx turbo link
```
