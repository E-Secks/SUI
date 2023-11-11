# SUI : script UI
UI Library for browser mod menus or userscripts.

## Overview

This library provides a basic way to create GUI menus and buttons using JavaScript. It's designed to be injected and executed directly in the browser's developer console. The library allows you to define menus, add buttons to them, and customize their appearance.

## Features

- Create customizable menus with buttons.
- Apply styles to menus and buttons.
- Make menus draggable.

## Usage

1. Open the developer console in your browser.
2. Copy and paste the library code from `main.js` into the console.
3. Use the provided functions to create menus and buttons, and then call `SUI.render()` to display the GUI.

```javascript

// Create main menu w/ buttons
let template = SUI.createMenu('Template', '20px', '20px');
template.addText('This is some sample text.');
template.addButton('Click me', () => alert('Button clicked!'));
template.addSlider('Volume', 0, 100, 50, (value) => console.log('Slider value:', value));
template.addInput('Input', 'Default value', (value) => console.log('Input value:', value));

// Create overlay
let overlay = SUI.createOverlay('Template')

window.addEventListener('keydown', (event) => {
  if (event.code === 'ShiftRight') {
      SUI.toggleMenu(template)
      SUI.toggleMenu(overlay)
  }
});

// Call render to display the GUI
SUI.render();

```
