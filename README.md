# Misofome

## Description
De app, api en admin interface voor het project Bureau AMC op CMD Amsterdam.
Gebaseerd op de bestaande varianten van [Emiel Zuurbier](http://misofo.me) en [Mohammed Kareem Belahmar](http://146.185.140.228).

## Table of Contents

## Installation

### Requirements:
- Recente versie van [Node](https://nodejs.org) (gemaakt en getest op v7.2.0).
- [MongoDB](https://www.mongodb.com) draaiend

Download of clone deze repo en installeer alle NPM dependencies met `npm install`.

### Productie
Om het project op te starten in productie modus, doe
```
npm start
```
- Bouwt PWA code naar een bundle
- Start server in productie modus (stuurt PWA App Shell)

### Development
Om het project op te starten in development modus, doe
```
npm run dev
```
- Start server in dev modus (geen app shell)
- Live reload server & PWA on file change

## Aanpassingen maken
Het project bestaat uit verschillende _loosely coupled_ onderdelen, die allen individueel aan te passen zijn.

### Datamodel
Alle data die beschikbaar is via de API en aan te passen is vanuit Admin wordt gevormd door de verschillende models.

In de map `/cms/models/` vind je onze implementatie van een datamodel.

Een datamodel wordt opgebouwd uit verschillende schemas.

```javascript
const mongoose = require('mongoose');

// Stel schema op
const exerciseSchema = mongoose.Schema({
  name: String,
  rating: Number
});

// Registreer schema
const Exercise = mongoose.model('exercise', exerciseSchema);

module.exports = Exercise;
```

@TODO: aanvullen

## Credits:

Originele implementatie PWA (2015):
- Emiel Zuurbier
- Sjoerd Roders
- Jelle Bot

Originele implementatie API (2015):
- Mohammed Kareem Belahmar

PWA, API en Admin (2016):
- Rijk van Zanten
- Anne Wouters
- Vera van der Pennen
