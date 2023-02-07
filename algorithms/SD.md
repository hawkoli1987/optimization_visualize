---
layout: "algorithm"
title: Steepest Descent Cauchy Step (Exact Line Search)
---
## Intuition
The 'best' stepsize is when the gradient of objective function against the stepsize exactly = 0

## Method
1. Calculate the Gradient ‘g’ at the current location ‘x’

2. Assign search direction $$ p = -g $$

3. Calculate the Gradient ‘g’ at the current location ‘x’

4. Calculate the current stepsize as: 
$$ \alpha = \frac{\alpha * (p^T \cdot p / \left|p\right|)}{g^T \cdot g / \left|g\right|} $$

5. Take the current step: 
$$x = x + \frac{\alpha * (-g)}{\left|g\right|}$$

6. Repeat step 2-5 until convergence
