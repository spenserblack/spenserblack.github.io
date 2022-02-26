## [Imretro](https://github.com/imretro)

This doesn't have much practical use with modern computing, but I did have fun
with it. Basically, I wanted to create an image format that is easy to write
manually, by using a hex editor or some other tool to write the bytes. The
inspiration retro games -- I found manually creating a palette and sprite to be
interesting.

The Imretro format supports 3 main modes:
- 1-bit pixel mode
- 2-bit pixel mode
- 8-bit pixel mode

As the names suggest, they set how many bits a pixel uses, which decides how
many colors are available for the palette. In 1-bit mode, only 2 colors are
allowed: one mapped to `0` and one mapped to `1`. In 2-bit mode, 4 colors, and
in 8-bit mode, 256 colors.

The image can also include a palette. If it doesn't use a palette, it should be
decoded using default palettes. For example, the default palette for 1-bit mode
is `#000000` and `#FFFFFF`. If it *does* include a palette, then there are 2
additional choices: color channel number and color accuracy.

There are 3 choices for color channel count are Grayscale, RGB, and RGBA. The
color accuracy choices are 2 bits per channel or 8 bits.

For example, with RGB and 8 bit color channels, then orange (`#FFAA00`) would
be `11111111`, `10101010`, and `00000000`. With RGBA and 2 bit color channels,
then the color would only need a single byte: `11100011` (the last `11` is to
set the alpha channel so that the color is fully opaque).

### What I Learned

This project was very good practice for processing bytes. It's also a great way
to learn the idiomatic way to decode and encode images in various languages.
