---
layout: "algorithm"
title: Nelder Mead Algorithm
---

## Method:
1. Define the simplex: a set of n+1 points in n-dimensional space, where n is the number of variables to optimize. The simplex is initialized with an initial guess of the optimal point.
2. Evaluate the objective function at each point in the simplex to obtain the function values.
3. Order the points in the simplex based on their function values, such that the best point is at one vertex, the worst point is at another vertex, and the other n-1 points are at the other vertices.
4. Reflect the worst point about the centroid of the n best points to obtain a new point.
    a. If the new point is better than the best point, expand it further away from the centroid.
    b. If the new point is worse than the second worst point, contract it towards the centroid.
    c. If the new point is still worse than the second worst point, contract the entire simplex towards the best point.
5. Repeat steps 2 to 4 until convergence, i.e. until the change in the function values is below a certain threshold.