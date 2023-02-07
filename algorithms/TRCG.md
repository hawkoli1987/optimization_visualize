---
layout: "algorithm"
title: Trust Region Conjugate Gradient
---
In a loop of finite numbers of step, 
    Calculate H and g at the current location x0;      
    
    Initialize r = -g - A*(x-x0) = -g, p = r

    Using linear conjugate gradient to optimize based on H and g, which does the following in a loop:
        
        Calculate the pHp, if pHp<0, (function concave), move to the edge of boundary:
            
            alpha = (delta * norm(p) - p.t() @ x) / norm(p)**2
            x = x + alpha * p
            exit the loop with latest x
        
        Calculate the r^2_old, and stepsize alpha = rs_old / pHp,

        If required step reached the boundary, i.e. norm(x + alpha * p) >= delta:
            clip to step to boundary: alpha = (delta * norm(p) - p.t() @ x) / p^2
            x = x + alpha * p
            exit the loop with latest x
    
        Else when the exact line search step is within the boundary:
            x = x + alpha * p
            r = r - alpha * A @ p
            rs_new = r.t() @ r

            If gradient has reached 0: norm(rs_new) < 1e-10:
                exit the loop with latest x
            
            beta = rs_new / rs_old
            p = r + beta * p
    
    Calculate true improvement = f(x) – f(x0),
    
    Define p = x-x0, local quadratic approximation function: f1(p) = 0.5*p*H*p+g*p+f(x0),
    
    Calculate predicted improvement = f1(p) – f1(0),
    
    rho = improvement_true / (improvement_pred + 1e-12),
    
    if rho < eta2:
        delta *= t1 # Shrink TR for the next step
    
    elif rho > eta3 and isclose(torch.norm(next_pos - current_pos).item(), delta):
        delta *= t2 # Expand TR for the next step

    If reached optima, norm(p) < 1e-5:	
        save x0 to history
        update the x0 to x 
        exit the loop with latest x
    
    if valid improvement, rho > eta1:
        save x0 to history
        update the x0 to x        
        continue the loop
    
    else it’s a bad estimation:	
        continue the loop (while reducing the TR size)
