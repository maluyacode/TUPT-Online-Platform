let data = [34, 51, 19, 23, 47, 45, 37, 49, 25, 17, 51, 30, 37, 46, 39, 36, 12, 47, 40, 31, 26, 47, 14, 41, 22, 39, 15, 16];

// Step 1: Find the range of the data
let dataMin = Math.min(...data);
let dataMax = Math.max(...data);
let dataRange = dataMax - dataMin;

// Step 2: Decide on the number of classes
let numClasses = 5;

// Step 3: Calculate the class width
let classWidth = dataRange / numClasses;

// Step 4: Define the boundaries of each class
let classBoundaries = [];
for (let i = 0; i <= numClasses; i++) {
    classBoundaries.push(dataMin + i * classWidth);
}

// Print the classes
for (let i = 0; i < numClasses; i++) {
    console.log(`Class ${i + 1}: ${classBoundaries[i]} - ${classBoundaries[i + 1]}`);
}
