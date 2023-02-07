---
layout: "page"
title: Unconstrained Gradient-based
order: 1
---
_"given an infinite amount of time, a monkey randomly hitting keys on a typewriter will almost surely produce any given text, including all of Shakespeare's works." -- Émile Borel_

![programming_monkey](/assets/images/programming_monkey2.png)

## Differentiable objective functions

- a. **Convex**:
the curvature of objective function is entirely on one-side of a plane, it always implies that we can find a unique global optimum. Typical convex functions includes:
    - i. Linear: Objective function is a linear combination of variables. It is a straight line in a 2D space.
    - ii. Quadratic: Objective function is a quadratic function of variables, in the form of x^T A x + b^T * x + c. It is a parabola in a 3D space.
    - iv. Higher order objectives: In most of cases, objective functions with higher orders can be approximated using quadratic function in consecutive local regions, following the principle of Taylor Series.

- b. **Non-convex**:
The objective funciton has multiple local optima or global optima. However, we can still approximate the consecutive local regions of the objective using quadratic functions, or any other functions like polynomial functions, radial basis functions, neural network, etc.

Convex or not, one key principle utilized in optimization is that we can find local optima by finding the stationary points, e.g. locations with gradient df(x)/dx = 0. In some of cases, if the function is differentiable, we can solve the system of linear equations df(x)/dx = 0. However, if the coefficient matrix of such linear equation is not full-rank (that wouuld be the majority of cases), solving such equation requires iterations, and such iterations doesn't guarantee to converge.


## Optimization Methods

- a. [**Fixed-step Methods**](/topics/1.1-fixedstep.html)

- b. [**Searched-step methods**](/topics/1.2-searchedstep.html)

- c. [**Second derivative methods**](/topics/1.3-secondderivative.html)

- d. [**Trust region methods**](/topics/1.4-trustregion.html)
