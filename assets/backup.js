var width = 960,
    height = 500,
    nx = parseInt(width / 5), // grid sizes
    ny = parseInt(height / 5),
    h = 1e-7, // step used when approximating gradients
    drawing_time = 30; // max time to run optimization

// create a Scalar Vector Graphics plot into the body of html
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Parameters describing where function is defined
var domain_x = [-2, 2],
    domain_y = [-2, 2],
    domain_f = [-2, 8], // function range
    contour_step = 0.5; // Step size of contour plot

var scale_x = d3.scaleLinear()
    .domain([0, width])
    .range(domain_x);

var scale_y = d3.scaleLinear()
    .domain([0, height])
    .range(domain_y);

var thresholds = d3.range(domain_f[0], domain_f[1], contour_step);

var color_scale = d3.scaleLinear()
    .domain(d3.extent(thresholds))
    .interpolate(function () { return d3.interpolateYlGnBu; });

// creates 3 group element, or 'g' element in JS syntax, assign them to different objects
var function_g = svg.append("g").on("mousedown", mousedown),
    gradient_path_g = svg.append("g"),
    menu_g = svg.append("g");

/*
* Set up the function and gradients
*/

/* Define the objective function */
function f(x, y) {
    return -2 * Math.exp(-((x - 1) * (x - 1) + y * y) / .2) + -3 * Math.exp(-((x + 1) * (x + 1) + y * y) / .2) + x * x + y * y;
}

/* Returns gradient of f at (x, y) */
function grad_f(x, y) {
    var grad_x = (f(x + h, y) - f(x, y)) / h
    grad_y = (f(x, y + h) - f(x, y)) / h
    return [grad_x, grad_y];
}

/* self written code for 2D gradient and hessian compuation*/
function hess_f(x, y) {
    var hessian = [[(f(x + h, y + h) - f(x + h, y) - f(x, y + h) + f(x, y)) / (h * h),
    (f(x + h, y) - 2 * f(x, y) + f(x - h, y)) / (h * h)],
    [(f(x, y + h) - 2 * f(x, y) + f(x, y - h)) / (h * h),
    (f(x + h, y + h) - f(x, y + h) - f(x + h, y) + f(x, y)) / (h * h)]];
    return hessian;
}

// /* self written code for 2D gradient and hessian compuation using mathjs*/
// function gradient_f(x, y) {
//     // Define the function f as a global variable
//     var grad_x = math.derivative(f.toString(), 'x').eval({ x: x, y: y });
//     var grad_y = math.derivative(f.toString(), 'y').eval({ x: x, y: y });
//     return [grad_x, grad_y];
// }

// function hessian_f(x, y) {
//     // Define the function f as a global variable
//     var hessian = [[math.derivative(math.expression(f), 'x', 2).eval({ x: x, y: y }), math.derivative(math.expression(f), 'x', 'y').eval({ x: x, y: y })],
//     [math.derivative(math.expression(f), 'y', 'x').eval({ x: x, y: y }), math.derivative(math.expression(f), 'y', 2).eval({ x: x, y: y })]];
//     return hessian;
// }
console.log('grad_f', grad_f(0, 0));
console.log('hess_f', hess_f(0, 0));
/* Returns values of f(x,y) at each point on grid as 1 dim array. */
function get_f_values(nx, ny) {
    var grid = new Array(nx * ny);
    for (i = 0; i < nx; i++) {
        for (j = 0; j < ny; j++) {
            var x = scale_x(parseFloat(i) / nx * width),
                y = scale_y(parseFloat(j) / ny * height);
            // Set value at ordering expected by d3.contour
            grid[i + j * nx] = f(x, y);
        }
    }
    return grid;
}

/*
* Set up the contour plot
*/
// create an empty contour object, with defined step size (threshold) and 2D area
var contours = d3.contours()
    .size([nx, ny])
    .thresholds(thresholds);

// calculate the objective function value at each grid location
var f_values = get_f_values(nx, ny);

// select all path elements in the svg group function_g, fill them with all colored contour lines representing objective function values.
function_g.selectAll("path")
    .data(contours(f_values)) // fill the serialized objective function value into the contour object
    .enter().append("path") // creates a new 'path' element for each filled contour object
    .attr("d", d3.geoPath(d3.geoIdentity().scale(width / nx))) // define the 'd' attribute of path, the value expected is a string representing path type
    .attr("fill", function (d) { return color_scale(d.value); }) // use the predefined color scale to fill each contour line with diff colors.
    .attr("stroke", "none");

/*
* Set up buttons
*/
var draw_bool = { "SGD": true, "Momentum": true, "RMSProp": true, "Adam": true, "Netwon": true };

var buttons = ["SGD", "Momentum", "RMSProp", "Adam", "Newton"];

// creates the rectangular background for the algorithm selection menu
menu_g.append("rect")
    .attr("x", 0)
    .attr("y", height - 40)
    .attr("width", width)
    .attr("height", 40)
    .attr("fill", "white")
    .attr("opacity", 0.2);

// creates the buttons for selecting algorithms to display
menu_g.selectAll("circle")
    .data(buttons)
    .enter()
    .append("circle")
    .attr("cx", function (d, i) { return width / 5 * (i + 0.25); })
    .attr("cy", height - 20)
    .attr("r", 10)
    .attr("stroke-width", 0.5)
    .attr("stroke", "black")
    .attr("class", function (d) { console.log(d); return d; })
    .attr("fill-opacity", 0.5)
    .attr("stroke-opacity", 1)
    .on("mousedown", button_press);

menu_g.selectAll("text")
    .data(buttons)
    .enter()
    .append("text")
    .attr("x", function (d, i) { return width / 5 * (i + 0.25) + 18; })
    .attr("y", height - 14)
    .text(function (d) { return d; })
    .attr("text-anchor", "start")
    .attr("font-family", "Helvetica Neue")
    .attr("font-size", 15)
    .attr("font-weight", 200)
    .attr("fill", "white")
    .attr("fill-opacity", 0.8);

// define the actions trigger when each button is pressed, i.e. selecting the corresponding algorithm
function button_press() {
    var type = d3.select(this).attr("class")
    if (draw_bool[type]) {
        d3.select(this).attr("fill-opacity", 0);
        draw_bool[type] = false;
    } else {
        d3.select(this).attr("fill-opacity", 0.5)
        draw_bool[type] = true;
    }
}

/*
* Set up optimization/gradient descent functions.
* SGD, Momentum, RMSProp, Adam.
*/

function get_sgd_path(x0, y0, learning_rate, num_steps) {
    var sgd_history = [{ "x": scale_x.invert(x0), "y": scale_y.invert(y0) }];
    var x1, y1, gradient;
    for (i = 0; i < num_steps; i++) {
        gradient = grad_f(x0, y0);
        x1 = x0 - learning_rate * gradient[0]
        y1 = y0 - learning_rate * gradient[1]
        sgd_history.push({ "x": scale_x.invert(x1), "y": scale_y.invert(y1) })
        x0 = x1
        y0 = y1
    }
    return sgd_history;
}

function get_momentum_path(x0, y0, learning_rate, num_steps, momentum) {
    var v_x = 0,
        v_y = 0;
    var momentum_history = [{ "x": scale_x.invert(x0), "y": scale_y.invert(y0) }];
    var x1, y1, gradient;
    for (i = 0; i < num_steps; i++) {
        gradient = grad_f(x0, y0)
        v_x = momentum * v_x - learning_rate * gradient[0]
        v_y = momentum * v_y - learning_rate * gradient[1]
        x1 = x0 + v_x
        y1 = y0 + v_y
        momentum_history.push({ "x": scale_x.invert(x1), "y": scale_y.invert(y1) })
        x0 = x1
        y0 = y1
    }
    return momentum_history
}

function get_rmsprop_path(x0, y0, learning_rate, num_steps, decay_rate, eps) {
    var cache_x = 0,
        cache_y = 0;
    var rmsprop_history = [{ "x": scale_x.invert(x0), "y": scale_y.invert(y0) }];
    var x1, y1, gradient;
    for (i = 0; i < num_steps; i++) {
        gradient = grad_f(x0, y0)
        cache_x = decay_rate * cache_x + (1 - decay_rate) * gradient[0] * gradient[0]
        cache_y = decay_rate * cache_y + (1 - decay_rate) * gradient[1] * gradient[1]
        x1 = x0 - learning_rate * gradient[0] / (Math.sqrt(cache_x) + eps)
        y1 = y0 - learning_rate * gradient[1] / (Math.sqrt(cache_y) + eps)
        rmsprop_history.push({ "x": scale_x.invert(x1), "y": scale_y.invert(y1) })
        x0 = x1
        y0 = y1
    }
    return rmsprop_history;
}

function get_adam_path(x0, y0, learning_rate, num_steps, beta_1, beta_2, eps) {
    var m_x = 0,
        m_y = 0,
        v_x = 0,
        v_y = 0;
    var adam_history = [{ "x": scale_x.invert(x0), "y": scale_y.invert(y0) }];
    var x1, y1, gradient;
    for (i = 0; i < num_steps; i++) {
        gradient = grad_f(x0, y0)
        m_x = beta_1 * m_x + (1 - beta_1) * gradient[0]
        m_y = beta_1 * m_y + (1 - beta_1) * gradient[1]
        v_x = beta_2 * v_x + (1 - beta_2) * gradient[0] * gradient[0]
        v_y = beta_2 * v_y + (1 - beta_2) * gradient[1] * gradient[1]
        x1 = x0 - learning_rate * m_x / (Math.sqrt(v_x) + eps)
        y1 = y0 - learning_rate * m_y / (Math.sqrt(v_y) + eps)
        adam_history.push({ "x": scale_x.invert(x1), "y": scale_y.invert(y1) })
        x0 = x1
        y0 = y1
    }
    return adam_history;
}

function get_newton_path(x0, y0, learning_rate, num_steps) {

    var newton_history = [{ "x": scale_x.invert(x0), "y": scale_y.invert(y0) }];
    var x1, y1, gradient, hessian, inv_hessian;
    for (i = 0; i < num_steps; i++) {
        gradient = grad_f(x0, y0);
        hessian = hess_f(x0, y0);
        console.log('step = ', i)
        console.log('hessian = ', hessian)
        // hessian = math.add(hessian, math.multiply(math.identity(hessian.length), 0.001)); // add a small positive step to make it always inversible
        inv_hessian = math.inv(hessian);
        console.log('inv_hessian = ', inv_hessian)
        x1 = x0 - math.multiply(inv_hessian, gradient).map(function (elem) { return elem * learning_rate });
        y1 = y0 - math.multiply(inv_hessian, gradient).map(function (elem) { return elem * learning_rate });
        newton_history.push({ "x": scale_x.invert(x1), "y": scale_y.invert(y1) });
        x0 = x1;
        y0 = y1;
    }
    return newton_history;
}
function get_gauss_newton_path(x0, y0, learning_rate, num_steps) {
    var history = [{ "x": scale_x.invert(x0), "y": scale_y.invert(y0) }];
    var x1, y1, gradient, jacobian, hessian, inv_hessian;
    for (i = 0; i < num_steps; i++) {
        gradient = grad_f(x0, y0);
        jacobian = jacob_f(x0, y0);
        hessian = math.multiply(math.transpose(jacobian), jacobian);
        inv_hessian = math.inv(hessian);
        x1 = x0 - math.multiply(inv_hessian, math.multiply(math.transpose(jacobian), gradient)).map(function (elem) { return elem * learning_rate });
        y1 = y0 - math.multiply(inv_hessian, math.multiply(math.transpose(jacobian), gradient)).map(function (elem) { return elem * learning_rate });
        newton_history.push({ "x": scale_x.invert(x1), "y": scale_y.invert(y1) });
        x0 = x1;
        y0 = y1;
    }
    return history;
}
function get_levenberg_marquardt_path(x0, y0, learning_rate, num_steps, lambda) {
    var history = [{ "x": scale_x.invert(x0), "y": scale_y.invert(y0) }];
    var x1, y1, gradient, hessian, inv_hessian;
    for (i = 0; i < num_steps; i++) {
        gradient = grad_f(x0, y0);
        hessian = hess_f(x0, y0);
        console.log('step = ', i)
        console.log('hessian = ', hessian)
        hessian = math.add(hessian, math.multiply(math.identity(hessian.length), lambda)); // add a small positive step to make it always inversible
        inv_hessian = math.inv(hessian);
        console.log('inv_hessian = ', inv_hessian)
        x1 = x0 - math.multiply(inv_hessian, gradient).map(function (elem) { return elem * learning_rate });
        y1 = y0 - math.multiply(inv_hessian, gradient).map(function (elem) { return elem * learning_rate });
        newton_history.push({ "x": scale_x.invert(x1), "y": scale_y.invert(y1) });
        x0 = x1;
        y0 = y1;
        lambda = lambda * 1.05; // increase lambda by 5%
    }
    return history;
}

function get_dfp_path(x0, y0, num_steps) {
    var c = [{ "x": scale_x.invert(x0), "y": scale_y.invert(y0) }];
    var x1, y1, gradient, hessian, inv_hessian, s, y, rho, id;

    // Initialize the inverse of the approximate Hessian to the identity matrix
    inv_hessian = math.eye(2);

    for (i = 0; i < num_steps; i++) {
        gradient = grad_f(x0, y0);
        hessian = hess_f(x0, y0);

        // Add a small positive step to make it always invertible
        hessian = math.add(hessian, math.multiply(math.eye(hessian.length), 0.001));
        inv_hessian = math.inv(hessian);

        // Compute search direction
        s = math.multiply(inv_hessian, gradient);

        // Compute new point
        x1 = x0 - s[0];
        y1 = y0 - s[1];

        history.push({ "x": scale_x.invert(x1), "y": scale_y.invert(y1) });

        // Compute difference between new and old point
        s = math.subtract([x1, y1], [x0, y0]);
        y = math.subtract(grad_f(x1, y1), grad_f(x0, y0));
        s = math.transpose(s);
        y = math.transpose(y);

        // DFP Algorithm
        if (i > 0) {
            var rho = 1 / math.dot(y, s);
            var Id = math.eye(s.length);
            var B_next = math.add(math.subtract(B, math.multiply(math.multiply(math.multiply(B, s), rho), math.transpose(math.multiply(B, s)))), math.multiply(math.multiply(s, rho), math.transpose(s)));
            x0 = x1;
            y0 = y1;
            B = B_next;
        }
        else {
            B = math.dotMultiply(math.eye(s.length), math.dot(s, math.transpose(s)));
            x0 = x1;
            y0 = y1;
        }
        history.push({ "x": scale_x.invert(x1), "y": scale_y.invert(y1) });
    }
    return history;
}

function get_BFGS_path(x0, y0, num_steps) {
    var history = [{ "x": scale_x.invert(x0), "y": scale_y.invert(y0) }];
    var x1, y1, gradient, hessian, inv_hessian, B_0, s, y, rho, I, B_1;
    B_0 = math.eye(2);
    for (i = 0; i < num_steps; i++) {
        gradient = grad_f(x0, y0);
        hessian = math.multiply(math.multiply(B_0, gradient), gradient.transpose());
        inv_hessian = math.inv(hessian);
        x1 = x0 - math.multiply(inv_hessian, gradient).map(function (elem) { return elem });
        y1 = y0 - math.multiply(inv_hessian, gradient).map(function (elem) { return elem });
        history.push({ "x": scale_x.invert(x1), "y": scale_y.invert(y1) });
        x0 = x1;
        y0 = y1;
        // Compute difference between new and old point
        s = math.subtract([x1, y1], [x0, y0]);
        y = math.subtract(grad_f(x1, y1), grad_f(x0, y0));
        s = math.transpose(s);
        y = math.transpose(y);
        rho = 1 / math.dot(y, s);
        B_next = math.subtract(math.add(B, math.multiply(rho, math.multiply(s, math.transpose(s)))), math.multiply(math.multiply(math.multiply(B, y), math.transpose(s)), rho));
        x0 = x1;
        y0 = y1;
        B = B_next;
        history.push({ "x": scale_x.invert(x1), "y": scale_y.invert(y1) });
    }
    return history;
}

function backtracking_line_search(x0, y0, grad, direction, alpha, beta) {
    var t = 1;
    while (f(x0 + t * direction[0], y0 + t * direction[1]) > f(x0, y0) + alpha * t * math.dot(grad, direction)) {
        t = beta * t;
    }
    return t;
}

// Trust region conjugate gradient method
function trustRegionCG(x0, learning_rate, num_steps, trust_region_radius) {
    var history = [{ "x": x0 }];
    var x = x0;
    var grad = grad_f(x);
    var direction = math.multiply(-1, grad);
    var step_size;
    for (i = 0; i < num_steps; i++) {
        step_size = lineSearch(x, direction);
        x = math.add(x, math.multiply(direction, step_size));
        grad = grad_f(x);
        if (math.norm(grad) < math.pow(10, -6)) {
            break;
        }
        if (math.norm(math.subtract(x, history[history.length - 1].x)) < trust_region_radius) {
            direction = math.subtract(grad, history[history.length - 1].grad);
        }
        else {
            direction = math.multiply(-1, grad);
        }
        history.push({ "x": x, "grad": grad });
    }
    return history;
}

function lagrangeMultiplier(x0, y0, learning_rate, num_steps) {
    // Initialize history to store the path of the optimization
    var history = [{ "x": x0, "y": y0 }];
    var x1, y1, grad, hessian, lambda, constraint1, constraint2, inv_hessian;
    for (i = 0; i < num_steps; i++) {
        grad = grad_f(x0, y0);
        hessian = hess_f(x0, y0);
        constraint1 = constraint1_f(x0, y0);
        constraint2 = constraint2_f(x0, y0);
        lambda = math.solve(math.concat(math.concat(hessian, constraint1), constraint2), math.concat(grad, [0, 0]));
        x1 = x0 - math.multiply(lambda[0], grad);
        y1 = y0 - math.multiply(lambda[0], grad);
        history.push({ "x": x1, "y": y1 });
        x0 = x1;
        y0 = y1;
    }
    return history;
}

function interior_point_method(x0, y0, learning_rate, num_steps) {
    var history = [{ "x": x0, "y": y0 }];
    var x1, y1, grad, hessian, inv_hessian, s, lambda = 0.1;
    for (i = 0; i < num_steps; i++) {
        // Compute gradient and Hessian
        grad = grad_f(x0, y0);
        hessian = hess_f(x0, y0);
        // Add barrier term to Hessian
        hessian = math.add(hessian, math.multiply(math.identity(hessian.length), 2 * lambda));
        // Compute search direction
        inv_hessian = math.inv(hessian);
        s = math.multiply(inv_hessian, grad);
        // Check if step is feasible
        if (math.abs(s) <= learning_rate) {
            x1 = x0 + s[0];
            y1 = y0 + s[1];
            if (inequality_constraint(x1, y1) <= 0 && equality_constraint(x1, y1) == 0) {
                x0 = x1;
                y0 = y1;
                history.push({ "x": x0, "y": y0 });

                // Reduce barrier term
                t = t * tau;

                // Compute new point using Newton's Method
                var hessian = hess_f(x);
                var gradient = grad_f(x);
                var inequality_constraint = h(x);
                var equality_constraint = g(x);

                // Add barrier term to hessian
                for (var i = 0; i < hessian.length; i++) {
                    hessian[i][i] += t * inequality_constraint;
                }

                // Compute Newton step
                var step = math.inv(hessian).map(function (elem) {
                    return math.multiply(elem, gradient);
                });

                // Backtracking line search
                var alpha = 1;
                var c1 = 0.1;
                var new_x = math.add(x, math.multiply(alpha, step));
                while (f(new_x) > f(x) + c1 * alpha * math.dot(gradient, step)) {
                    alpha = alpha * 0.5;
                    new_x = math.add(x, math.multiply(alpha, step));
                }

                // Update x
                x = new_x;

                // Check stopping criterion
                if (math.norm(math.subtract(x, x_old)) < tol) {
                    break;
                }
            }
        }
    }
}
/*
* Functions necessary for path visualizations
*/

var line_function = d3.line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; });

function draw_path(path_data, type) {
    var gradient_path = gradient_path_g.selectAll(type)
        .data(path_data)
        .enter()
        .append("path")
        .attr("d", line_function(path_data.slice(0, 1)))
        .attr("class", type)
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("stroke-opacity", 0.5)
        .transition()
        .duration(drawing_time)
        .delay(function (d, i) { return drawing_time * i; })
        .attr("d", function (d, i) { return line_function(path_data.slice(0, i + 1)); })
        .remove();

    gradient_path_g.append("path")
        .attr("d", line_function(path_data))
        .attr("class", type)
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("stroke-opacity", 0.5)
        .attr("stroke-opacity", 0)
        .transition()
        .duration(path_data.length * drawing_time)
        .attr("stroke-opacity", 0.5);
}

/*
* Start minimization from click on contour map
*/

function mousedown() {
    /* Get initial point */
    var point = d3.mouse(this);
    /* Minimize and draw paths */
    minimize(scale_x(point[0]), scale_y(point[1]));
}

function minimize(x0, y0) {
    gradient_path_g.selectAll("path").remove();

    if (draw_bool.SGD) {
        var sgd_data = get_sgd_path(x0, y0, 2e-2, 500);
        draw_path(sgd_data, "sgd");
    }
    if (draw_bool.Momentum) {
        var momentum_data = get_momentum_path(x0, y0, 1e-2, 200, 0.8);
        draw_path(momentum_data, "momentum");
    }
    if (draw_bool.RMSProp) {
        var rmsprop_data = get_rmsprop_path(x0, y0, 1e-2, 300, 0.99, 1e-6);
        draw_path(rmsprop_data, "rmsprop");
    }
    if (draw_bool.Adam) {
        var adam_data = get_adam_path(x0, y0, 1e-2, 100, 0.7, 0.999, 1e-6);
        draw_path(adam_data, "adam");
    }
    if (draw_bool.Netwon) {
        var Newton_data = get_newton_path(x0, y0, 1e-2, 100, 0.7, 0.999, 1e-6);
        draw_path(Newton_data, "newton");
    }
}
