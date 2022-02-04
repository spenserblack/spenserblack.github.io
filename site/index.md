---
title: My github.io
---
## My github.io

Welcome! Here I'll document random projects, thoughts, or anything else.

### My Projects

Here are some of my projects that you may find interesting.

#### [termage](https://github.com/spenserblack/termage)

This is a project I started to learn Go. One of the most important things
that I learned is that, if you're going to add tests and/or coverage, do
it *before* you put significant work into the project, not after. 😅

`termage` is a binary that allows you to view images, including animated
GIFs, **in the terminal**.

#### [Emoji Getter](https://github.com/spenserblack/emoji-getter)

A binary to *get* emojis, written **with** emojis. This is written in the
esoteric language [Emojicode](https://www.emojicode.org/). The logic is
pretty simple: match an emoji's name or keywords to the emoji itself.
If the argument is matched to a name, then that single emoji is printed
to STDOUT. Otherwise, all emojis matching the argument as a keyword are
printed. I also made a
[Docker GitHub action](https://github.com/spenserblack/actions-build-emojicode)
so that I could build it with a CI.

#### [favlist](https://github.com/spenserblack/favlist)

Oops! I accidentally made a command-line SQLite browser and manager!

All I wanted to do was make a utility so that I can make a list of
some of my favorite things. For example, favorite movies and how I rate
them. But my lists would be non-standard. So I decided to make a
command-line tool that could define tables and columns in a SQLite
database, and insert, delete, and update rows. Talk about overkill!

This project has been dropped in favor of
[favlist.vue](https://github.com/spenserblack/favlist.vue), which
instead uses JSON as the "database," which can be exported and imported
as JSON. favlist.vue was my first project made with Vue, to learn the
framework.

#### [fun-jp-terms](https://github.com/spenserblack/fun-jp-terms)

This is a site I made to learn Svelte. But that's not the main
goal, and the site itself is not very fancy. The main goal is
to document interesting Japanese terms (at least, interesting
to me as an American).
