#!/bin/sh
command_exists() {
	command -v "$1" > /dev/null 2>&1
}

if ! command_exists convert || ! command_exists inkscape; then
	echo "ImageMagick and Inkscape is required." 1>&2
	exit 1
fi

SCRIPT="$(readlink -f "$0")"
ROOT="$(dirname "$(dirname "$SCRIPT")")"
cd "$ROOT"

convert -density 256x256 -background black public/favicon.svg -define icon:auto-resize=16,32,48,64,256 public/favicon.ico
