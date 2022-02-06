---
title: Git (The Stuff They Don't Teach You)
tags:
  - git
---
## Git

The stuff you should know (but they probably didn't teach you).

### Refresher

If you learned Git, you know `git add` and `git commit`. `git add` stages
changes, and `git commit`... commits changes. What does this mean? Here is
another way to put it: `git add` tells git "here are the changes I like," and
`git commit` says "I'm done telling you which changes I like, now save them!"

### Making *Good* Commits

First step: if you learned that the Git workflow is `git add .` and
`git commit -m "Did a thing"`, unlearn it. Forming a habit of using `git add`
and `git commit` like this is a beginner's trap that results in a messy git
history.

#### Making Sure Your History Is Clean

Here is a good general rule: 1 useful change for 1 commit. Why? It makes the
history more useful. Here's a basic example: what if your history looked like
this?

```console
$ git log --oneline
aaaaaaaa Add cool feature and fix bug
```

Now what if that "cool feature" wasn't so cool after all? What if you wanted to
undo it? You could use `git revert aaaaaaaa`, but then you would lose the bug
fix.

But what if your history looked like this?

```console
$ git log --oneline
bbbbbbbb Fix bug
aaaaaaaa Add cool feature
```

Now `git revert aaaaaaaa` is no problem! The bug fix is kept when you revert
the "Add cool feature" commit.

For keeping a clean history, `git add --patch` is the best command that nobody
uses. What does it do? Normally, `git add [path]` stages *all* changes in
files. `git add --patch` (`git add -p` for short) lets you review the changes
in each file, and *pick which changes to add and which to ignore.* This is not
only an incrediblyuseful way to avoid staging/committing unrelated changes.
Also, if you're not 100% sure what's staged before a commit, run `git status`
or `git diff --staged` to double-check that everything looks good.
