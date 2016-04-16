---
svg: test.svg
title:  Sine and cosine
dek: I need a description of this.
---

{% include header.html %}

Now that we know how to draw more complex shapes, we need to examine an important concept that is incredibly helpful when generating shapes in code: Sine and Cosine.

Over the years, I've seen great many of my students struggle with the basics of `sin()` and `cos()`, which is both unfortunate and a bit unnecessary. It's unfortunate because these functions can help solve many problems when making programmatic designs. It's unnecessary because one needs only to memorize two short lines of code to use them. We will get back to that right after a short introduction to `cos()` and `sin()`.

To understand how to use `sin()` and `cos()`, let's imagine that we have a circle with a `1px` radius on the screen. That's a very tiny circle, so here it is magnified a bit.

chart of circle with 1px radius.

Sine and cosine simply gives us a way to find any position on the edge of that tiny circle. As demonstrated in the following, you just need a degree in radians, and `cos()` will give you back the `x` position while `sin()` will give you back the `y` position corresponding to that point on the circle.

Interactive example. See notes.

It's not really necessary to know how this calculation happens, but it's actually rather simple. Because we assume that the circle is `1px` in radius, and we know the degree of the point we're trying to find, we can use basic euclidean geometry to create a right-sided triangle from the circle center to the point (hypotenuse), and then figure out the length of the adjacent side (`x`) and the length of the opposite side (`y`) from that.

diagram of circle with triangle and numbers.

EXPLAIN THE TWO LINES TO MEMORIZE, INCLUDING MULTIPLY BY RADIUS.

So what can we use this for? As you might have noticed, sine and cosine gives us an easy way to find points on a circle. So here comes the big reveal: It is possible to draw all basic shapes with `sin()`, `cos()`, and a `for` loop. The only thing that determines which shape to draw is the number of points we add on the circle.

line - triangle - square - hexagon - circle

As this example demonstrates, the code for this is actually rather simple.

CODE EXAMPLE WHERE USE CAN CHANGE POINTS AND DEGREE

However, this technique can be used to draw many other things. Introducing a bit of randomization allows us to make a more complex shape.

COMPLEX SHAPE code EXAMPLE

If we decrease the radius for every other point, we can draw a star.

STAR SHAPE AND CODE EXAMPLE

ALL EXAMPLES FROM NOTEBOOK.

The more you use `sin()` and `cos()`, the more you will come to appreciate it as an easy tool to draw all sorts of shapes.
