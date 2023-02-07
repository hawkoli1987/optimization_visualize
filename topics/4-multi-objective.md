---
layout: "page"
title: Multi-Objective
order: 4
---
_“The virtue of justice consists in moderation, as regulated by wisdom.” --Aristotle_
<div>
    <iframe src="{{ site.baseurl }}/assets/multiobject.html" width="900" height="1740"></iframe>
</div>

Objective function is a combination of more than one functions, each representing a different objective. There are two general ways of dealing with them, depends on if we know our preferences over each objective before or after we know how well we can achieve each objective.  

## Prior

If we have information on how to make trade-off between the objectives from the beginning, we can combine the multiple objectives into a single objective, via following methods:

- Goal programming: if we have a target range for each objective, and a standard evaluation scale of how much it costs to deviate from each target range, we can unify the objective into one single objective, while converting the rest to constraints.

- Scalarization: corresponding to all posteriori methods below, with the preference information once known, can be directly converted to a corresponding prior method. E.g. if the weight of each objective is given, it can be directly used to make a linear scalarization of objectives to form a single objective.

## Posteriori

In the naïve case, we don’t know our preference over each of objective, we can only try to obtain a set of optimal solutions known as pareto front. Everyone in the pareto front represents a ‘best’ outcome, in the sense that we cannot get a ‘better’ solution in one objective without compromising some other objectives. The methods of obtaining the pareto front could be:

- Weighted sum: assign a set of weights to each objective, with the total sum of weights at each single moment being constant. The variation of weight on each objective will show the process of trading off between each objective, and hence the different points in the pareto front.  

- Epsilon constraint: optimize for one objective each time, while constraining all other objectives to a value epsilon. With the epsilon changes from 0 to maximum in a fixed step size, the entire pareto front is traced out.

- Normal boundary intersection: draw a straight line (assuming 2 objectives) between anchor points (i.e. the optima of each single objective with all the other objectives absent), divide the line into N uniform segments, and evaluate the optima which is normal to the line at the respective division points.  

- Multi-objective evolutionary algorithms (MOEAs): MOEAs, such as Non-dominated Sorting Genetic Algorithm (NSGA-II), will keep a population of ‘good’ solutions by nature, defined as lower ranks of pareto fronts. The resultant set of optima naturally represents the different optima in a pareto front.

The methods above are listed in a generally perceived ascending order of effectiveness, measured by the capability to capture the pareto front accurately.


