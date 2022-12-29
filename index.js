// var child_process = require("child_process");

// Toy Calculator
function calculate() {
    // Get the selected operation
    var operation = document.getElementById("operation").value;

    // Get the input numbers
    var num1 = Number(document.getElementById("num1").value);
    var num2 = Number(document.getElementById("num2").value);

    // Perform the selected operation
    var result;
    if (operation == "add") {
        result = num1 + num2;
    } else if (operation == "subtract") {
        result = num1 - num2;
    } else if (operation == "multiply") {
        result = num1 * num2;
    } else if (operation == "divide") {
        result = num1 / num2;
    }

    // Display the result
    document.getElementById("result").innerHTML = result;
}

// Dictionary mapping objective functions to available algorithms
var algorithmAvailability = {
    "obj1": ["alg1", "alg2", "alg5", "alg6", "alg8"],
    "obj2": ["alg1", "alg3", "alg4", "alg6", "alg7", "alg8"],
    "obj3": ["alg2", "alg4", "alg6", "alg7", "alg8"]
};

// Dictionary mapping algorithms to available hyperparameters
var hyperparameterAvailability = {
    "alg1": ["param1", "param2"],
    "alg2": ["param1", "param3", "param4"],
    "alg3": ["param2", "param5"],
    "alg4": ["param3", "param4", "param6"],
    "alg5": ["param1", "param2", "param7"],
    "alg6": ["param1", "param2", "param3", "param4", "param5", "param6", "param7", "param8"],
    "alg7": ["param3", "param4", "param5", "param6"],
    "alg8": ["param1", "param2", "param3", "param4", "param5", "param6", "param7", "param8"]
};

// Function to update the available algorithms based on the selected objective function
function updateAlgorithms() {
    // Get the selected objective function
    var objective = document.getElementById("objective").value;

    // Get the list of available algorithms for the selected objective function
    var availableAlgorithms = algorithmAvailability[objective];

    // Get the algorithm dropdown menu
    var algorithmSelect = document.getElementById("algorithm");

    // Clear the existing options
    algorithmSelect.innerHTML = "";

    // Loop through all algorithms in the hyperparameterAvailability dictionary
    for (var algorithm in hyperparameterAvailability) {
        // Check if the current algorithm is available for the selected objective function
        if (availableAlgorithms.includes(algorithm)) {
            // Create an option element for the algorithm
            var option = document.createElement("option");
            option.value = algorithm;
            option.innerHTML = algorithm;
            option.disabled = false
        } else {
            // Create a disabled option element for the algorithm
            var option = document.createElement("option");
            option.value = algorithm;
            option.innerHTML = algorithm;
            option.disabled = true;
        }

        // Append the option element to the algorithm dropdown menu
        algorithmSelect.appendChild(option);
    }

    // Update the hyperparameters based on the selected algorithm
    updateHyperparameters();
}

// Function to update the hyperparameter controls based on the selected algorithm
function updateHyperparameters() {
    // Get the selected algorithm
    var algorithm = document.getElementById("algorithm").value;

    // Get the list of available hyperparameters for the selected algorithm
    var availableHyperparameters = hyperparameterAvailability[algorithm];

    // Clear the existing hyperparameter controls
    var controlsDiv = document.getElementById("hyperparameter-controls");
    controlsDiv.innerHTML = "";

    // Create textboxes for each available hyperparameter
    for (var i = 0; i < availableHyperparameters.length; i++) {
        var param = availableHyperparameters[i];
        controlsDiv.innerHTML += 
        `
        <label for="${param}">${param}:</label>
        <input type="text" id="${param}">
        <br>
        `;
    }
}


// Function to refresh the 3D plot based on the selected objective function and algorithm
function refreshPlot() {
    // Get the selected objective function
    var obj = document.getElementById("objective").value;

    // Call the makePlot() function to create the plot
    makePlot(obj);

}

function makePlot(obj) {
    // Define a dictionary mapping integers to objective functions
    const objectives = {
        "obj1": (x, y) => x ** 2 + y ** 2,
        "obj2": (x, y) => (x ** 2 + y ** 2) * Math.sin(x ** 2 + y ** 2),
        "obj3": (x, y) => Math.abs(x ** 2 + y ** 2),
    };

    // Get the selected objective function
    const objective = objectives[obj];

    // Generate the x and y data from -2 to 2.
    const x = [];
    const y = [];
    for (let i = -2; i <= 2; i += 0.1) {
        x.push(i);
        y.push(i);
    }

    // Generate the z data
    const z = [];
    for (let i = 0; i < x.length; i++) {
        z[i] = [];
        for (let j = 0; j < y.length; j++) {
            z[i][j] = objective(x[i], y[j]);
        }
    }

    // Create a figure with a 3D surface plot
    const p = {
        title: { text: "3D Surface Plot" },
        xaxis: { title: { text: "x" } },
        yaxis: { title: { text: "y" } },
        zaxis: { title: { text: "z" } },
        scene: {
            xaxis: { title: "x" },
            yaxis: { title: "y" },
            zaxis: { title: "z" },
        },
        hovermode: "closest",
        autosize: true,
    };

    Plotly.newPlot("plot", [{
        type: "surface",
        x: x,
        y: y,
        z: z,
        colorscale: "Viridis",
        colorbar: {
            title: { text: "z" },
            tickfont: {
                size: 14,
                color: "rgb(107, 107, 107)",
            },
        },
    }], p, {
        responsive: true,
        displaylogo: false,
        showTips: true,
        modeBarButtonsToRemove: ["sendDataToCloud"],
        modeBarButtonsToAdd: [{
            name: "Download data",
            icon: Plotly.Icons.disk,
            click: function () {
                const str = "x,y,z\n" + x.map((x, i) => x + "," + y[i] + "," + z[i]).join("\n");
                const filename = "data.csv";
                const blob = new Blob([str], { type: "text/csv;charset=utf-8;" });
                if (navigator.msSaveBlob) { // IE 10+
                    navigator.msSaveBlob(blob, filename);
                } else {
                    const link = document.createElement("a");
                    if (link.download !== undefined) { // feature detection
                        // Browsers that support HTML5 download attribute
                        const url = URL.createObjectURL(blob);
                        link.setAttribute("href", url);
                        link.setAttribute("download", filename);
                        link.style.visibility = "hidden";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            },
        }],
    });
}