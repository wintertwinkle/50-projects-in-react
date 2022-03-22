# Notes

## What's the difference between event `keydown` and `keypress`?

First, I used the event `keypress` to listen the keyboard, but I found that I can't catch the event when I press key like `F1`, `Esc`, `Home`, etc. I can only catch the event from numbers and letters.
But after I changed `keypress` to `keydown`, I found every key in keyboard will emit their event.

## Search Result

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event) says `keypress` event is **Deprecated**, we should use `beforeinput` or `keydown` instead.

Why `keypress` is deprecated, I guess maybe it can't catch all the keyboard event?

Aha, let's do research!

OK, I found the difference between `keydown` and `keypress` from [stackoverflow](https://stackoverflow.com/questions/38502560/whats-the-difference-between-keyup-keydown-keypress-and-input-events)

> The `keypress` event is sent to an element when the browser registers keyboard input. This is similar to the `keydown` event, **except that modifier and non-printing keys such as Shift, Esc, and delete trigger keydown events but not keypress events.** Other differences between the two events may arise depending on platform and browser.

_Modifier and non-printing keys such as Shift, Esc, and delete trigger keydown events but not keypress events_

But it doesn't answer why `keypress` is deprecated.

<p align="center">
<img src="../../docImage/OIP.nYBcrYUG2U8jZGtNyrq4dAAAAA.jpg">
</p>

Ten minutes later.... ok , I gave up.

Is there anybody knows why event `keypress` deprecated? ^\_^
