# Simple Side Scroller 🎮 [![Netlify Status](https://api.netlify.com/api/v1/badges/162deb84-9165-4fe5-b11d-c3c0955518a0/deploy-status)](https://app.netlify.com/sites/simple-sidescrolling-game/deploys)

Welcome to **simple_side_scroller**, a project to track my progress in web-based game development. This game was built to practice and showcase foundational skills, inspired by my **game_dev** repository.

## 🕹️ Gameplay

In **simple_side_scroller**, the goal is simple: **jump over enemies** to earn points! Your score is tracked in the top-left corner. The game is playable on both desktop and mobile:

- **Desktop**: Press **Enter** to restart the game.
- **Mobile**: Tap to jump and tap again to restart.

### Features

- **Jumping Mechanics**: Avoid enemies by jumping over them to earn points.
- **Fullscreen Mode**: Play in fullscreen for an immersive experience.
- **Debug Mode**: Toggle this to show hitboxes, a "debug" indicator, and FPS for performance insights.

## 📱 Mobile Compatibility

The game is optimized for mobile with simplified controls—jumping only, no left or right movement, so you can play on the go!

## 📁 Project Structure

- **assets/img/**  
  Contains visual assets like `background`, `player`, and `enemy1`.

- **classes/**  
  Houses JavaScript files for each core component:

  - `background.class.js` - Handles background visuals and scrolling.
  - `player.class.js` - Defines player actions, like jumping.
  - `enemy.class.js` - Manages enemy movement and interactions.
  - `inputHandler.class.js` - Manages player inputs for both desktop and mobile.

- **Root Directory**
  - `index.html` - The main HTML file that launches the game.
  - `style.css` - Styles the layout and UI elements.

## 🚀 Goal

This project documents my journey in creating a 2D side-scroller, focusing on player interactions, game asset management, and debugging features for an enriched development experience.

## 📌 Notes

This game builds on concepts from my [**game_dev**](https://github.com/mariokreitz/game_dev) repository, where I explore essential game development techniques. "simple_side_scroller" brings these elements together, focusing on Canvas animation, collision detection, and dynamic effects, and lets me track how these skills evolve with each project. It’s both a practice ground and a showcase of my progress in game development.
