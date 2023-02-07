---
layout: "page"
title: Uncertainties
order: 5
---
_"Uncertainty is the only certainty there is, and knowing how to live with insecurity is the only security."_
_- John Allen Paulos_
![schrodinger's cat](/assets/images/uncertainty.png)

Uncertainty is real world variability/inaccuracies associated with input variables. It can be measurement error, machining tolerances, model accuracies etc.. These variabilities will propagate into optimization result, and bring two major impacts onto the outcome of Optimization: 
- Reliability: capability to meet the constraints.
- Robustness: capability to achieve the objective.

To be well informed on the resultant variabilities, we have the following methods:

1.	**Monte Carlo simulation**: This method involves generating multiple samples of the input data and propagating each sample through the model or system. The results are then used to estimate the probability distribution of the output.

2.	**Polynomial chaos expansion**: This method involves approximating the input-output relationship as a polynomial function, where the coefficients are calculated using a set of orthogonal polynomials.

3.	**Gaussian process**: This method involves modeling the input-output relationship as a Gaussian process, where the mean and covariance functions are estimated from the data.

4.	**Stochastic finite element method**: This method involves modeling the system as a set of differential equations and solving them using a Monte Carlo approach.

5.	**Stochastic collocation**: This method involves approximating the input-output relationship using a set of collocation points, where the values at the collocation points are estimated using a set of interpolating polynomials.
