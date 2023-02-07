---
layout: "algorithm"
title: GaussNewton Method
---
## Intuition:
Hessian matrix (2nd order derivative) of an objective function is expensive to compute, hence we can approximate it using the square of jacobian/gradient (1st order derivative).

## Method:
1. Start with an initial variables of the non-linear function.

2. Linearize (by calculate the gradient and approximated Hessian matrix) the objective function around the current estimate of the parameters. The Hessian matrix is approximated by the square of gradient.

3. Solve the linearized system of equations (e.g. or multiplying the inverse of approximated Hessian matrix with the local objective function) to get an updated of the variables.

4. Apply the update to the variables.

5. Repeat the process until convergence or reaching the maximum number of steps.
