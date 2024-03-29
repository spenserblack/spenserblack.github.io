---
title: favlist
tags:
  - rust
  - sqlite
  - sqlite3
---
## [favlist](https://github.com/spenserblack/favlist)

Oops! I accidentally made a command-line SQLite browser and manager!

All I wanted to do was make a utility so that I can make a list of
some of my favorite things. For example, favorite movies and how I rate
them. But my lists would be non-standard. So I decided to make a
command-line tool that could define tables and columns in a SQLite
database, and insert, delete, and update rows. Talk about overkill!

This project was dropped in favor of [favlist.vue], which instead uses JSON as
the "database," which can be exported and imported as JSON. favlist.vue was my
first project made with Vue, to learn the framework.

But I was pretty unhappy with that, so I turned it into an Electron app using
the [quasar framework](https://quasar.dev/). This version saves your data to
a sqlite3 database, but it can be imported and exported with text data formats. 

[favlist.vue]: https://github.com/spenserblack/favlist.vue
