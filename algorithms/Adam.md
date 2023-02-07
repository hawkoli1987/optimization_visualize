---
layout: "algorithm"
title: Adam
---
## Intuition: 
uses a combination of 1. adaptive learning rate, 2. moment (moving averages of the past gradients) and 3. second moment (squared gradients).

## Method:
1. Initialize the model parameters and initialize the first moment estimate (m) and second moment estimate (v) to 0.
2. Compute the gradient of the loss function with respect to the model parameters.
3. Update the first moment estimate (m) by taking an exponentially weighted average of the gradient, with a decay rate of β1:
m_t = β1 * m_{t-1} + (1 - β1) * gradient
4. Update the second moment estimate (v) by taking an exponentially weighted average of the squared gradient, with a decay rate of β2:
v_t = β2 * v_{t-1} + (1 - β2) * gradient^2
5. Compute the bias-corrected first moment estimate (m_hat), using the corrected estimates of the first and second moment:
m_hat = m_t / (1 - β1^t)
6. Compute the bias-corrected second moment estimate (v_hat), using the corrected estimate of the second moment:
v_hat = v_t / (1 - β2^t)
7. Update the parameters using the gradient descent rule, with a learning rate (α) and the bias-corrected moment estimates:
parameters = parameters - α * m_hat / (√(v_hat) + ϵ), where ϵ is a small positive constant used for numerical stability.
8. Repeat the step 1-7 until convergence or a maximum number of iterations is reached.