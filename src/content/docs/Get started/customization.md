---
title: Customization
sidebar:
  order: 3
description: Learn how to customize styles with Tailwind CSS and visual parameters with Three.js.
---

Each component in this project is designed to be **easily customizable**, so you can adapt it to your brand, layout, or creative vision without hassle.

You don’t need to dig through complex config files — all the customization happens **directly inside the components**. You can follow the instructions inside each component, marked with numbers like: ❶❷❸...

---

## Tailwind CSS Customization

All UI elements are styled using [Tailwind CSS](https://tailwindcss.com). This means you can:

- Change **colors**, **spacing**, **borders**, **shadows**, and **typography**
- Apply responsive variants and hover effects
- Extend or override styles with your own Tailwind configuration

Every component includes inline class names that you can edit freely. For example:

```jsx
<div className="bg-neutral-900 p-4 rounded-2xl shadow-lg">

```

If you're using custom TailwindCSS variables, make sure to add them to your global.css file:

```css
<!-- src/styles/global.css -->
@theme {
  --color-primary: #050506;
}

```

---

## Three.js Parameter Customization

For components that use [Three.js](https://threejs.org), you’ll find clear comments and sections inside the code where you can tweak things like:

- **Colors of particles or objects**
- **Animation speed and easing**
- **Lighting, shadows, and camera position**
- **Geometry size and material type**

Each Three.js component is written to be self-contained and annotated, so you’ll see code like:

```js
const color = new THREE.Color('#dfe9e8');
const speed = 0.015;
mesh.material = new THREE.MeshStandardMaterial({ color });
```

You can change these values directly to adjust the behavior and appearance of the scene.

---

## How to Know What to Edit

At the top of each component file, you’ll find comments like:

```jsx
// Customize Tailwind styles below  ❶
// Adjust Three.js settings here  ❷
```

These markers help you quickly locate the parts of the code meant for customization — no need to read the whole file line by line.

---

## 🛠️ Built for Hacking

This project was created with flexibility in mind. Whether you're building a slick portfolio, a fun landing page, or a visual experiment — you’re encouraged to **make it your own**.

> If you break something while experimenting… don’t worry, that’s part of the fun 😄

---
