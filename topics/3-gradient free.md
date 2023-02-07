---
layout: "page"
title: Gradient Free
order: 3
---

_"Is it possible to navigate without a compass?"_ 
_"Yes, through the use of triangulation, satellite, or a combination of both." -- Yuli_
![evolution](/assets/images/robot_maze.png)

We cannot compute the gradient of the objective functions and use it to guide our optimization, due to reasons such as:

1.	No analytical description of the function (e.g. result is obtained from simulation or experiments).

2.	Stochastic function evaluation (e.g. noisy).  

3.	Discontinuous objective function (e.g. regions with invalid solutions)

The following are the common approaches in dealing with non-differential objective functions:

## Non-gradient Based Methods
- a. [Pattern Search](/topics/3.1-pattern.html)

- b. [Stochastic](/topics/3.2-stochastic.html)
    
- c. [Population-based](/topics/3.3-population.html)

- d. [Surrogate Objective](/topics/3.4-surrogate.html)
