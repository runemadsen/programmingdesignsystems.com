---
svg: test.svg
title:  Custom shapes
dek: I need a description of this.
---

{% include header.html %}

Although the basic shapes give us a great lesson in how to think about symbolism, more complex shapes offer more possibilities. Before the computer, complexity was often synonymous with time spent, as the designer would need to manually construct all the complexity by hand. Despite efforts to automate demanding tasks, programs like Photoshop and Illustrator have the very same problems. When using a programming language, there are no such limitations.

On the other hand, drawing in code is not the same as drawing by hand. We can quickly draw organic shapes by hand which would take days to distill into an algorithm, while we do not even compare to the precision of the computer. These are important considerations to make when designing in code. REWRITE.

In the following, we will look at how to draw custom shapes in code, show examples of how to use these shapes in the design process, and go through a few helpful techniques that are good to know when drawing shapes in code.

## Custom shapes in code

Most graphics programming languages allows you to draw custom shapes exactly like in a *Connect the dots* drawing. First, you define a series of points, which we will refer to as vertices. Then, these vertices are connected via lines to form the outline of a shape.

Each vertex in a shape also has the ability to define how this line is drawn. If it is a simple vertex, it will be connected via a straight line. If it is a curved vertex, it will be connected via a curved line. The shape can optionally become a closed shape by connecting the last vertex to the first vertex.

1-2-3A series of points with vertex types
Vertex points connected with optional close
Fill and stroke

P5.js follows this same concept. You simply use `beginShape()` to start a new custom shape, then define the vertices of the shape using the vertex functions, and connect the lines in the shape by calling `endShape()` with an optional argument to close the shape. In the following, we will examine these vertex functions to understand how to build more complex shapes.

## Straight lines

Drawing shapes with straight lines is done via the `vertex()` function. All shapes created with the `beginShape()` and `endShape()` functions must start with a simple `vertex()` that defines the starting point of the shape.

INTERACTIVE EXAMPLE. SEE NOTEBOOK

The following examples shows a number of shapes created just using the `vertex()` function.

3 SHAPE EXAMPLES. SEE NOTEBOOK

GRAPHIC DESIGN EXAMPLES AND USAGE

## Curves

Drawing shapes with curved lines is done via the `curveVertex()` function, which is a bit more complex than the `vertex()` function. For one, it needs several `x` and `y` coordinates to define the curve of the line, by using the concept of Bézier curves.

The Bézier curve algorithm was popularized by Pierre Bézier in 1962^[https://en.wikipedia.org/wiki/B%C3%A9zier_curve] as a solution to a common problem in computational geometry: Drawing curved lines that can scale to any size. It is rather easy to draw something that resembles a curved line with a series of straight lines, but if you scale these points, the straight lines become visible.

FIGURE CURVED WITH STRAIGHT LINES
FIGURE SCALED TO REVEAL STRAIGHT LINES

Bézier curves solve this problem in a very elegant way by introducing the idea of control points, which drag a straight line into a curve. A Bézier curve with a single control point is called a quadratic Bézier, while a Bézier curve with two control points is called a cubic Bézier. If you have ever used the Pen tool in Photoshop, Illustrator, or Keynote, you have used cubic Bézier curves.

Although you don't really need to know how the computer calculates a curved line from the control point(s), the following figure can be helpful to illustrate the basic concepts.

CONCEPTS RUNNING. SEE NOTEBOOK.

You can draw both quadratic and cubic Bézier curves with the `curveVertex()` function. The line of code to the left draws a quadratic bezier curve with a COLOR:single control point and the COLOR:vertex position. The line of code to the right draws a cubic Bézier curve with COLOR:two control points and the COLOR:vertex position.

INTERACTIVE EXAMPLE: SEE NOTEBOOK.

You cannot start a custom shape with `curveVertex()`. You always need a single `vertex()` function call to define the starting point of the shape.

Using Bézier curves is harder than drawing straight lines, and even knowing how many curves to use for a specific shape can be hard. Here are some examples showing how to draw different shapes with the `curveVertex()` function.

1-2-3: SEE NOTEBOOK

GRAPHIC DESIGN EXAMPLES

## Contours

While `vertex()` and `curveVertex()` gives us the ability to draw most custom shapes from scratch, there is one thing tha we still don't know how to do: Draw a shape with a hole in it. In P5.js, a hole is called a contour, and you can draw shapes with contours using the `beginContour()` and `endContour()` functions.

example.... NOTEBOOK

GRAPHIC DESIGN EXAMPLES WITH HOLES

## Wet and Sharp

Yup




AT END:
Many of the examples above have a lot of vertices that are meticulously defined in code, like you would draw them with the mouse in a program like Illustrator. This is of course not the ultimate promise of algorithmic design. Why make shapes in code when they are faster to draw with a mouse? Now that we understand the basics of custom shapes, let's look at a number of techniques you can use to draw shapes in a more procedural way. SIN/COS in same chapter or after????
