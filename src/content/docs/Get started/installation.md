---
title: Installation
sidebar:
  order: 2
description: No installation required — just copy and paste. But here’s what you need to get started.
---


## 📦 No Package Installation Required

You don’t need to install this project as a dependency — in fact, **there’s no NPM package available (yet)**.

Right now, using the project is as simple as:

> **Copying and pasting the components** into your own project.

That’s it. No build steps, no complex tooling. Grab what you need and use it however you like.

---

## 🛠️ Project Requirements

Although this project doesn't need to be installed, there are **three essential tools** you'll need to have in your project to make the components work as expected:

---

### 1. [Astro](https://docs.astro.build)

> The modern framework for building fast, content-driven websites.

Astro is a **static site generator** that lets you use your favorite frontend tools in a highly optimized environment. It delivers lightning-fast performance and a great developer experience.

Install Astro with:

```bash
npm create astro@latest
```

More details at the [Astro documentation](https://docs.astro.build).

---

### 2. [TailwindCSS](https://docs.astro.build)

> A utility-first CSS framework for building modern and responsive user interfaces.

Most components in this project are styled using Tailwind CSS. It's fast, flexible, and makes styling your pages a breeze.

To install it in your Astro project:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

To connect it with Astro, follow the  
[Tailwind + Astro Integration Guide](https://docs.astro.build/en/guides/integrations-guide/tailwind/)

---

### 3. [ThreeJS](https://docs.astro.build)

> A powerful JavaScript 3D library that brings immersive experiences to the browser.

Some components use Three.js to render particles, 3D animations, and visual effects.

Install it with:

```bash
npm install three
```

Learn more at the [Three.js documentation](https://threejs.org/docs/).

---

Once these tools are installed, you're good to go!  
Just copy the components you need into your project and start building ✨

Need help getting started? 