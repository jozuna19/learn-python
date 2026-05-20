# 🐍 Learn Python

A complete Python course that runs entirely in your browser — from your first `print()` to advanced patterns.

**[Try it live →](https://jozuna19.github.io/learn-python/)**

![Learn Python home page](screenshots/home.png)

## Features

- **Interactive Python runner** — every code block has a ▶ Run button. Real Python 3 executes in your browser via [Skulpt](https://skulpt.org). No install, no setup, no backend.
- **14 modules, 46 lessons** — a structured path from "what is a variable?" to decorators, generators, and OOP.
- **Cloud progress sync** — sign in with Google and your completed lessons follow you across devices via Firebase.
- **Local-first** — works without an account too. Progress saves to `localStorage` and syncs to the cloud when you sign in.
- **Syntax-highlighted code** — every snippet styled with [highlight.js](https://highlightjs.org).
- **No build step** — just static HTML, CSS, and JavaScript served from GitHub Pages.

![A lesson page with runnable code blocks](screenshots/lesson.png)

## What you'll learn

1. **Getting Started** — what Python is, how to run it, your first program
2. **Variables & Data Types** — numbers, strings, booleans, None, type conversion
3. **Operators** — comparison, logical, and assignment operators
4. **Strings In Depth** — indexing, slicing, string methods, f-strings
5. **Control Flow** — if/elif/else and match/case
6. **Loops** — while, for, range, break and continue
7. **Functions** — definitions, arguments, return values, scope, lambdas
8. **Data Structures** — lists, tuples, dictionaries, sets
9. **Comprehensions** — list, dict, and set comprehensions
10. **Error Handling** — try/except, raising errors, custom exceptions
11. **File I/O** — reading and writing files
12. **Object-Oriented Programming** — classes, inheritance, dunders
13. **Modules & Packages** — imports, the standard library, pip basics
14. **Advanced Python** — decorators, generators, context managers

## Tech stack

- **[Skulpt](https://skulpt.org)** — a Python 3 interpreter compiled to JavaScript. Powers the in-browser code runner.
- **[Firebase](https://firebase.google.com)** — Google Auth for sign-in, Firestore for syncing per-user progress.
- **[highlight.js](https://highlightjs.org)** — syntax highlighting for code blocks.
- Vanilla HTML, CSS, and JavaScript — no framework, no bundler.
- **GitHub Pages** for hosting.

## Running locally

It's static — no install required. Pick whichever you prefer:

```bash
# Option 1: just open the file
open index.html

# Option 2: serve over HTTP (so Firebase auth works cleanly)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
.
├── index.html        # shell — sidebar, main pane, script tags
├── style.css         # all styling
├── app.js            # routing, Skulpt runner, Firebase auth, progress
├── curriculum.js     # every lesson — content, code samples, key points
└── screenshots/      # README images
```

Lesson content lives in `curriculum.js` as a single array. Each module has lessons, each lesson has HTML content and an optional `tryCode` sandbox.

## Credits

Built with [Skulpt](https://skulpt.org), [Firebase](https://firebase.google.com), and [highlight.js](https://highlightjs.org).
