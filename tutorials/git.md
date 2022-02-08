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
only an incredibly useful way to avoid staging/committing unrelated changes,
but also a great way to learn how git works.
Also, if you're not 100% sure what's staged before a commit, run `git status`
or `git diff --staged` to double-check that everything looks good.

#### Writing Good Commit Messages

If you only use `git commit -m "Changes"`, then you've written commits with
subject lines. But did you know that, like an email, a commit message can have
both a subject and a body? Commit messages can have multiple lines. The first
line is the subject, the second line should be empty, and any line after that
is the body. Here is an commit message with a subject and body.

```
Add a git tutorial

Many useful git features are either ignored or misused. This tutorial
instructs its readers on how to write a good commit message and use some
git subcommands.
```

The *correct* way to write a good commit message
would be to just execute `git commit` (no `-m`), and let git open a text editor.
You may want to use `git config --global core.editor <editor command>` to use
your favorite text editor for commits. So if that's the correct way, what's the
other way? `-m` can actually be passed multiple times to `git commit`, like so:
`git commit -m "subject" -m "detailed explanation of changes"`. So why isn't this
the correct way? Simple: it's easier to format text to be pretty in a text editor
than in the command line. 😆

### `git bisect`

This is an awesome command that is sorely underused. It lets you *identify the
commit that introduced a bug.* What it does is let you mark an earlier commit
as "good" and a recent commit as "bad." It will then jump to the halfway
point of the "good" and "bad" commit, ask you if the currently checked-out
commit is good or bad, then continue the previous step until a single commit
is identified as the first bad commit.

Here is an example of using `git bisect`.

```shell
# Something is failing! But it wasn't failing before... 🤔
git bisect start
git bisect bad
git checkout HEAD~20 # Jump 20 commits backwards
# Check if the bug still exists. No bug? Then this is a good commit!
git bisect good
# Now git will checkout a commit and ask you if it's good or bad.
# Keep marking commits as either good or bad and eventually...
# Commit <sha> identified as the first bad commit
```

Now, if you have a *clean* history, identifying the bad commit
allows you to check the diff with `git show <sha>`. Viewing the diff
can make it very easy to see what change introduced the bug, which
makes it much easier to identify what to do to fix the bug.

### `git cherry-pick`

This is a great tool to apply a single commit, ignoring other commits.
For example, what if you had a branch that looks like this?

```console
$ git log --oneline branch-for-testing
cccccccc Add pointless stuff
bbbbbbbb Actually fix an important thing
aaaaaaaa Do nothing important
```

You *could* `git merge branch-for-testing`, but you would get two
useless commits that you probably don't want. Instead, you could
use `git cherry-pick bbbbbbbb` to apply that single commit to
your current branch.

⚠️ If you cherrypick a commit, it will not be the exact same
commit, but a *different commit with the same message and diff.*
This is because the applied commit has a different parent than
the commit specified with `git cherry-pick`. You probably do
*not* want to cherrypick from a branch that you are planning
to merge, because you can introduce duplicate commits this way.

### Miscellaneous Notes

#### Commit Message Recovery

Once you get into more advanced Git usage, a commit can fail for
a variety of reasons. For example, a failed attempt to sign a commit,
or a failed commit hook.

If you've put a lot of work into your commit message, you certainly
don't want to lose the entire message the next time you attempt a
commit! Thankfully, your commit message will continue to exist
in `.git/COMMIT_EDITMSG` (`.git/modules/<module name>/COMMIT_EDITMSG`
for submodules) *until you run `git commit` again.* So make sure
that you try to recover your commit message *before* you attempt another
commit.

[This Stack Overflow answer](https://stackoverflow.com/a/57218983) has
an awesome solution to recovering commit messages.
You can create an alias called `recommit` which will automatically
find the `COMMIT_EDITMSG` file and reuse it for the new commit.

```bash
git config --global alias.recommit '!git commit -eF $(git rev-parse --git-dir)/COMMIT_EDITMSG'
```
