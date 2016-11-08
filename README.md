# testing-e2e
# Tamvan Blog Engine build with TDD

Simple example of TDD implementation for building a simple blog engine.

This simple blog engine will only have two models, user and article. It's built with **Node.JS, Express (framework), MongoDB (database), mongoose (ODM), and passport (authentication), and also mocha and chai for testing**

## File Structure

```
```

## package.json

```
{
  "name": "testing-e2e",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.15.1",
    "chai": "^3.5.0",
    "chai-http": "^3.0.0",
    "cookie-parser": "~1.4.3",
    "cors": "^2.8.1",
    "debug": "~2.2.0",
    "dotenv": "^2.0.0",
    "express": "~4.13.4",
    "express-session": "^1.14.2",
    "jade": "~1.11.0",
    "mongodb": "^2.2.11",
    "mongoose": "^4.6.6",
    "morgan": "~1.7.0",
    "passport": "^0.3.2",
    "passport-local": "^1.0.0",
    "serve-favicon": "~2.3.0"
  }
}
```

## API Routes

The default host and port for development is `http://localhost:3000/`

| Route | Method | Action |
|-------|--------|--------|
| /api/article/ | GET | Get all the article lists |
| /api/article/:slug | GET | Get the spesific article detail based on slug|
| /api/article/ | POST | Post a new article |
| /api/article/:id | PUT | Edit a single article based on id |
| /api/article/:id | DELETE | Delete single article based on id |
