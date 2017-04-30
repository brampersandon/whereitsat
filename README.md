# WHERE IT'S AT
> 'I got two turntables and a microphone'

This is a project to check out a hypothesis of mine, which boils down to this:

We may be able to learn something about music, and about musicians,
by analyzing the part-of-speech structures most common in their work.

Starting with Beck.

## Why Beck?

I don't know.

## What is this?

- A bunch of Beck lyrics copied from around the internet (`/api/beck.txt`)
- A thing to parse a file full of `\n`-separated lyrics into json (`/api/parser.js`)
- The parsed result of `beck.txt` into json (`/api/beck.txt.json`)
- A web service so we may be able to visualize it all (`/api/index.js`)
- At some point, perhaps a UI for this?

## Why did you do this?

Part-of-speech tagging is interesting to me, and the structures we can uncover
with it are perhaps even more interesting.

This uses a rather inaccurate and not-really-vetted POS tagger though, so
it's not likely this amounts to significant or rigorous research. I'm
cool with it for the time being, though.

## How do I use it?

You don't. I'll host it. Sorry.
