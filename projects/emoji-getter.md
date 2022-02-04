---
title: Emoji Getter
tags:
  - emojicode
  - esoteric language
---

## [Emoji Getter](https://github.com/spenserblack/emoji-getter)

A binary to *get* emojis, written **with** emojis. This is written in the
esoteric language [Emojicode](https://www.emojicode.org/). The logic is
pretty simple: match an emoji's name or keywords to the emoji itself.
If the argument is matched to a name, then that single emoji is printed
to STDOUT. Otherwise, all emojis matching the argument as a keyword are
printed. I also made a
[Docker GitHub action](https://github.com/spenserblack/actions-build-emojicode)
so that I could build it with a CI.
