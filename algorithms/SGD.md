---
layout: "algorithm"
title: Stochastic Gradient Descent
---

## Intuition: 

## Method:
1. Choose an initial set of parameters for the model.

2. Calculate the gradient of the objective function with respect to the model parameters at a randomly sampled points. The gradient represents the direction of the steepest increase in the cost function.

3. Subtract the gradient from the current parameters to update the parameters. The magnitude of the update is determined by the learning rate, which is a hyperparameter.

4. Repeat steps 2 and 3 until the parameters converge to a minimum value of the cost function, or until a maximum number of iterations has been reached.

5. The final set of parameters represents the minimum value of the objective function.