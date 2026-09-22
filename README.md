# Leon Margale — Interactive Portfolio

An interactive developer portfolio built with Next.js, TypeScript and the HTML Canvas API.

The site combines a conventional portfolio interface with a small real-time simulation featuring procedural tree generation, animated ravens, rain and responsive world geometry.

## Live Demo

[View the portfolio](https://sowashieristjaschoninteressant.github.io/leonMargalePortfolioSite/)

## Features

* Procedurally generated fractal tree
* Autonomous ravens controlled through state machines
* Exclusive perch reservation and occupation
* Animated tree reactions when ravens land
* Dynamic rain simulation
* Responsive canvas geometry
* Mobile-friendly portfolio sections
* Automatic deployment through GitHub Actions

## Technical Overview

The animated background is implemented directly with the HTML Canvas API rather than a dedicated rendering framework.

Each part of the simulation has a separate responsibility:

* `Renderer` manages the animation loop and frame updates.
* `FracTree` generates, updates and renders the tree geometry.
* `RavenSystem` manages raven creation and lifecycle.
* `Bird` controls movement through states such as flying, perching, exiting and death.
* `PerchRegistry` coordinates available, reserved and occupied branches.
* `Bounds` provides shared viewport dimensions for responsive world updates.
* `Rain` manages the animated weather effect.

The perch registry prevents multiple ravens from targeting the same branch. When a raven lands, the registry reports its impact to the tree, which responds using a small spring-and-damping simulation.

## Tech Stack

* Next.js
* React
* TypeScript
* HTML Canvas API
* CSS Modules
* GitHub Actions
* GitHub Pages

## Project Structure

```text
src/
├── app/                 Next.js application and global styles
├── components/          Canvas stage and portfolio interface
├── data/                Portfolio project data
├── engine/              Renderer, sprites, animation and shared types
├── features/
│   ├── birds/           Raven behavior and lifecycle
│   ├── rain/            Rain simulation
│   └── tree/            Tree generation and perch management
├── shared/              Mathematical helper functions
└── utils/               Asset loading and error handling
```

## Running Locally

Clone the repository:

```bash
git clone https://github.com/sowashieristjaschoninteressant/leonMargalePortfolioSite.git
cd leonMargalePortfolioSite
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Production Build

Create a static production build:

```bash
npm run build
```

The exported site is generated in the `out` directory.

## Deployment

The portfolio is deployed to GitHub Pages through a GitHub Actions workflow. Every push to the `main` branch triggers a new production build and deployment.

## Contact

* [GitHub](https://github.com/sowashieristjaschoninteressant)
* [LinkedIn](https://www.linkedin.com/in/leon-margale-881660235/)
* [Email](mailto:leon@margale.de)
