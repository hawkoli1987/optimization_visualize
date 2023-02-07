---
layout: "algorithm"
title: BFGS
---

## Intuition: 
Similar as DFP, but it preserves the positive symmetry of Hessian matrix, resulting in better numeric stability and faster convergence than DFP.

## Method:
1. Initialize the iteration counter $$k = 0$$, choose an initial estimate $$x_0$$ and a positive definite approximation of the inverse of the Hessian matrix $$B_0$$.

2. Compute the gradient of the objective function $$g_k = \nabla f(x_k)$$ at $$x_k$$.

3. Compute the search direction $$d_k = -B_k g_k$$.

4. Choose a step size $$\alpha_k$$ using a line search algorithm.

4. Update the current location to $$x_{k+1} = x_k + \alpha_k d_k$$.

5. Compute the gradient at new location $$g_{k+1} = \nabla f(x_{k+1})$$ at $$x_{k+1}$$.

6. Compute the approximation of the inverse of the Hessian matrix $$B_{k+1}$$ using the BFGS formula: $$B_{k+1} = B_k + \frac{y_k y_k^T}{y_k^T s_k} - \frac{B_k s_k s_k^T B_k}{s_k^T B_k s_k}$$, where $$y_k = g_{k+1} - g_k$$ and $$s_k = x_{k+1} - x_k$$, representing the finite step increment in gradient and increment in location respectively.

7. Increment the iteration counter, and repeat step 2-6 until convergence.

## Reference:
https://en.wikipedia.org/wiki/Broyden%E2%80%93Fletcher%E2%80%93Goldfarb%E2%80%93Shanno_algorithm