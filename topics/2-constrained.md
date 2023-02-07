---
layout: "page"
title: Constrained Optimization
order: 2
---
_"The end does not justify the means, for the means by which we live are the end we achieve." - Eleanor Roosevelt_
![tamiya race](/assets/images/4wd.png)

Constraints refers to the boundaries that stems from real-life limitations, be it a resource limitation, a legal requirement, or physical laws that must be abide to. The accurate representation of contraints makes an optimization solution feasible and relevant. In optimization problems, we classifies the constraints as either 1. equality, e.g. the Kirchoff rule specifies that the net current entering and leaving a node in an electric circuit must be 0; or 2. inequality: e.g. the maximum amount of stress inside any part of an aircraft structure must be within an allowable limit. The methods in dealing with these two types of constraints will be different, although related. 

## KKT conditions:
A set of necessary (and sometimes sufficient) condition for a solution to be optimal in constrained optimization. It is a foundational concept that helps to establish the various methods below. It consists of 4 conditions

1. Stationarity: the optima must be at the stationary points of the expanded form of objective 

2. Primal feasibility: contraints are all satisfied at optima

3. Dual feasibility: this must be non-negative penalty for violating the inequality constraint

4. Complementary slackness condition: the optima could be either away from the inequality constraint, or completely anti-parallel with the constraint. Using a metaphor, it is like saying: "If I'm truly wise, I will stay away from the law's boundary when I can't benefit from violating it, or I will study it so well that I cannot obtain further benefit without violating it."

## Penalty Terms: 
convert inequality constraints into Penality terms, and add them into the objective function.

1. Exterior quadratic penalty: form the penalty term as a quadratic function w.r.t. the extent of constraint violation.

2. Interior negative log penalty: form the penalty term as a negative log function w.r.t. the approximity to the constraint, hence build an infinitely steep barrier to force the solution to the feasible region.

## Methods: 

1. [**Lagrangian Multiplier**](/topics/2.1-lagrangian.html)

2. [**Sequential Quadratic Programming**](/topics/2.2-SQP.html)

3. [**Interior Point Method**](/topics/2.3-interiorpoint.html)