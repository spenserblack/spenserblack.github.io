---
title: repofetch
tags:
  - Rust
  - Ruby
---
# [Repofetch][repofetch] (Rewrite it in ~~Rust~~ Ruby?)

This is a work-in-progress that is undergoing a *major* overhaul. Rust was my first hobby language,
and so I was writing all of my personal projects in Rust. And repofetch was one of my first
personal projects, so, naturally, it was written in Rust.

It was intended to be a way to show data about your repository. Since [onefetch] exists as a tool
to report local data (number of commits, language used, etc.), I wanted to write repofetch to focus
on the *remote* data (number of stars, number of issues, etc.). I completed a version that supported
GitHub repositories, and then I... stopped.

I wanted to support at least Bitbucket and GitLab, but the task of learning two new APIs felt
overwhelming. I let this project sit for a while, just occasionally merging dependabot pull
requests. And then, after seeing some interest from the community, I decided to continue working on
it.

Yet supporting multiple repository hosts in a single
project, which could potentially have vastly different APIs, still felt overwhelming. And that's
when I got the idea that, instead of having one massive project to support everything, I could
rewrite Repofetch to be plugin-based. There would be some official plugins, of course, but also it
should be easy for the community to write their own plugins.

The current idea is that a user can install plugins and define the ones they want to use in a config
file. These plugins would then get dynamically imported, and plugins would provide tools to the main
Repofetch project to let Repofetch decide which plugin should be used. For example, if a
repository's remote origin URL is `github.com/foo/bar.git`, then a GitHub plugin would report that
it should be used, and a GitLab plugin would report that it should *not* be used. Additionally, like
the original version, if a user knows which remote they want to get data from, and maybe Repofetch
doesn't know, they should be able to select that from the command-line.

And so I decided to abandon Rust in favor of a language that easily supported dynamic imports. I
first started with TypeScript, because I thought it would be helpful to export a `Plugin` type that
plugin authors could import. However, globally installing plugins seemed like it would be too much
work for the users, as some Node versions seemed like they would require the user to modify a
`NODE_PATH` environment variable to import/require from global packages. That felt like asking a bit
too much from the user. The other two candidates were Python and Ruby. What put Ruby ahead was the
behavior of its `require`. With Python there was a danger of circular imports. A plugin might try
to import a utility from Repofetch, while Repofetch is attempting to import the plugin. But Ruby's
`require` is different: it attempts to load the module, and only loads it once. This makes circular
dependencies a *bit* safer: a plugin can require the main `'repofetch'` module (useful for writing
tests), and repofetch is still able to `require` the plugin during its dynamic `require`.

At the time of writing this, the plugin-based version is nearly ready for an initial release, but
it is still a work in progress, and the Ruby version can be viewed on the `ruby` branch. However,
I'm very excited about how it is turning out!

## Update (2022/12/12)

An initial version of this rewrite is now published at [rubygems.org][gem]. I'm still figuring
out some things, so there may be some breaking changes for plugin authors. For example, I'm
still deciding the best way to define a primary color for a plugin's stats, and which methods
should be required vs. options.

[gem]: https://rubygems.org/gems/repofetch
[onefetch]: https://github.com/o2sh/onefetch
[repofetch]: https://github.com/spenserblack/repofetch
