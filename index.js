console.log("Sorting Visualizer");

const newArrBtn = document.getElementById("newArrBtn");
const bubbleSortBtn = document.getElementById("bubbleSortBtn");
const insertionSortBtn = document.getElementById("insertionSortBtn");
const selectionSortBtn = document.getElementById("selectionSortBtn");
const mergeSortBtn = document.getElementById("mergeSortBtn");
const quickSortBtn = document.getElementById("quickSortBtn");
const visualizerCont = document.getElementById("visualizerCont");
const subHead = document.getElementById("subHead");
const subHeadingCont = document.getElementById("subHeadingCont");
const buttonContainer = document.getElementById("buttonContainer");
const speedController = document.getElementById("speedController");
const decLen = document.getElementById("decLen");
const incLen = document.getElementById("incLen");

// stores the waiting time so that user get ample time to see what's happening
let waitTime = 0;

// unsorted array
let arr = [];
let len = 10; // initial length of array

// creating a dictionary of div element that is rod
let dict = {};

// to get new array
newArrBtn.addEventListener('click', () => {
    location.reload();
    NotPerforming();
});

// to decrease the array size
decLen.addEventListener('click', () => {
    decreaseArraySize();
})

// to increase the array size
incLen.addEventListener('click', () => {
    increaseArraySize();
})

// to call bubble sort function on button click
bubbleSortBtn.addEventListener('click', () => {
    waitTime = getWaitTime();
    Performing("Bubble Sort");
    bubbleSort(arr);
});
// to call insertion sort function on button click
insertionSortBtn.addEventListener('click', () => {
    waitTime = getWaitTime();
    Performing("Insertion Sort");
    insertionSort(arr);
});
// to call selection sort function on button click
selectionSortBtn.addEventListener('click', () => {
    waitTime = getWaitTime();
    Performing("Selection Sort");
    selectionSort(arr);
});
// to call merge sort function on button click
mergeSortBtn.addEventListener('click', () => {
    waitTime = getWaitTime();
    Performing("Merge Sort");
    mergeSort(arr, len);
    changeHeight();
    subHead.innerHTML = "Completed Merge Sort";
});
// to call quick sort function on button click
quickSortBtn.addEventListener('click', () => {
    waitTime = getWaitTime();
    Performing("Quick Sort");
    quickSort(arr, len, 0, len - 1, 0, len + 1);
    changeHeight();
    subHead.innerHTML = "Completed Quick Sort";
});

// function to remove buttons
function Performing(which_sort) {
    subHead.innerHTML = `Performing ${which_sort} ...`;
    subHeadingCont.style.display = "block";
    buttonContainer.style.display = "none";
}

// function to get back buttons
function NotPerforming() {
    subHeadingCont.style.display = "none";
    buttonContainer.style.display = "flex";
}

// to calculate wait time
function getWaitTime() {
    let time = 1000 - (speedController.value * 10) + (Math.random() * 10);
    return time;
}

// function to generate random array
function getNewArr(arr, arrayLen) {
    for (let i = 0; i < arrayLen; i++) {
        let rand_value = Math.round((Math.random() * 10) * 25) + Math.round(Math.random() * 10);
        arr[i] = rand_value;
    }
}
getNewArr(arr, len);

// function to increase the array length
function increaseArraySize() {
    len++;
    getNewArr(arr, len);
    visualizerCont.innerHTML = "";
    generateRods(len);
    generateDict(dict, len);
    changeHeight();
}

// function to decrease the length of array
function decreaseArraySize() {
    if (len > 5) {
        len--;
        getNewArr(arr, len);
        arr.pop();  // to remove the old element at last
        visualizerCont.innerHTML = "";
        generateRods(len);
        generateDict(dict, len);
        changeHeight();
    }
    else {
        alert("Minimum Length is (5)");
    }
}

// function to generate rods
function generateRods(arrayLen) {
    // creating an array by creating a div element
    for (let i = 0; i < arrayLen; i++) {
        let divEle = document.createElement('div');
        divEle.className = "rodStyle";
        divEle.id = `rod_${i + 1}`;
        visualizerCont.appendChild(divEle);
    }
}
generateRods(len);

// function to generate dictionary
function generateDict(dict, arrayLen) {
    for (let i = 0; i < arrayLen; i++) {
        dict[`rod_${i + 1}`] = document.getElementById(`rod_${i + 1}`);
    }
}
generateDict(dict, len);

// changing the length of element accrording to array
function changeHeight() {
    for (let i = 0; i < arr.length; i++) {
        dict[`rod_${i + 1}`].style.height = `${arr[i]}px`;
    }
}
changeHeight();

// swapping function
function swap(arr, index_1, index_2) {
    let temp = arr[index_1];
    arr[index_1] = arr[index_2];
    arr[index_2] = temp;
}

// bubble sort function
async function bubbleSort(g_arr) {
    for (let k = 1; k <= g_arr.length; k++) {
        let i;
        for (i = 0; i < g_arr.length - k; i++) {
            waitTime = getWaitTime();  // update the wait_time in runtime
            dict[`rod_${(i) + 1}`].style.background = "red";
            dict[`rod_${(i + 1) + 1}`].style.background = "darkgreen";
            await sleep(waitTime);
            if (g_arr[i] > g_arr[i + 1]) {
                swap(g_arr, i, i + 1);
                changeHeight();
            }
            await sleep(waitTime);
            dict[`rod_${(i) + 1}`].style.background = "yellow";
            dict[`rod_${(i + 1) + 1}`].style.background = "yellow";
            await sleep(waitTime);
        }
        dict[`rod_${i + 1}`].style.background = "blue";
    }
    subHead.innerHTML = `Completed Bubble Sort`;
}

// selection sort function
async function selectionSort(g_arr) {
    for (let i = 0; i < g_arr.length; i++) {
        dict[`rod_${i + 1}`].style.background = "orange";
        await sleep(waitTime);
        for (let j = i + 1; j < g_arr.length; j++) {
            waitTime = getWaitTime();  // update the wait_time in runtime
            dict[`rod_${j + 1}`].style.background = "green";
            await sleep(waitTime);
            if (g_arr[j] < g_arr[i]) {
                swap(g_arr, i, j);
                changeHeight();
                await sleep(waitTime);
            }
            await sleep(waitTime);
            dict[`rod_${j + 1}`].style.background = "yellow";
        }
        await sleep(waitTime);
        dict[`rod_${i + 1}`].style.background = "darkcyan";
    }
    subHead.innerHTML = `Completed Selection Sort`;
}

// insertion sort function
async function insertionSort(g_arr) {
    let value;
    for (let i = 1; i < g_arr.length; i++) {
        value = g_arr[i];
        dict[`rod_${i + 1}`].style.background = "black";
        await sleep(waitTime);
        for (let j = i - 1; j >= 0; j--) {
            waitTime = getWaitTime();  // update the wait_time in runtime
            dict[`rod_${j + 1}`].style.background = "crimson";
            await sleep(waitTime);
            if (value < g_arr[j]) {
                dict[`rod_${j + 1 + 1}`].style.background = "orange";
                await sleep(waitTime);
                g_arr[j + 1] = g_arr[j];
                g_arr[j] = value;
                changeHeight();
                dict[`rod_${j + 1 + 1}`].style.background = "yellow";
                dict[`rod_${i + 1}`].style.background = "black";
                await sleep(waitTime);
            }
            dict[`rod_${j + 1}`].style.background = "yellow";
            await sleep(waitTime);
        }
        dict[`rod_${i + 1}`].style.background = "yellow";
        await sleep(waitTime);
    }
    subHead.innerHTML = `Completed Insertion Sort`;
}

// function for merge sort
async function mergeSort(arr, len) {
    // return condition 
    if (len < 2) {
        return;
    }
    // calculating length of left and right arrays
    let leftLen = Math.trunc(len / 2);
    let rightLen = len - leftLen;
    // creating two empty arrays
    let leftArr = [];
    let rightArr = [];
    // adding elements to the arrays
    for (let i = 0; i < leftLen; i++) {  // left array
        leftArr[i] = arr[i];
    }
    for (let j = 0; j < rightLen; j++){
        rightArr[j] = arr[j + leftLen];
    }
    // recursion
    mergeSort(leftArr, leftLen);
    mergeSort(rightArr, rightLen);
    // merging the arrays
    merge(arr, len, leftArr, leftLen, rightArr, rightLen);
}
async function merge(arr, len, leftArr, leftLen, rightArr, rightLen) {
    let i = 0;
    let j = 0;
    let k = 0;

    while (i < leftLen && j < rightLen && k < len) {
        if (leftArr[i] < rightArr[j]) {
            arr[k] = leftArr[i];
            i += 1;
        }
        else {
            arr[k] = rightArr[j];
            j += 1;
        }
        k += 1;
    }
    while (i < leftLen && k < len) {
        arr[k] = leftArr[i];
        i += 1;
        k += 1;
    }
    while (j < rightLen && k < len) {
        arr[k] = rightArr[j];
        j += 1;
        k += 1;
    }
}

// function for quick sort
function quickSort(arr, len, pivot, q, p_val, q_val) {
    if (len <= 1) {
        return;
    }

    let p = pivot;

    for (p; p < len; p++) {
        p_val++;
        if (arr[p] > arr[pivot]) {
            break;
        }
    }
    for (q; q >= pivot; q--) {
        q_val--;
        if (arr[q] <= arr[pivot]) {
            break;
        }
    }

    if (p_val >= q_val) {
        let temp = arr[pivot];
        arr[pivot] = arr[q];
        arr[q] = temp;

        quickSort(arr, q, 0, q - 1, 0, q + 1);
        quickSort(arr, len - (q + 1), q + 1, len - 1, 0, len - (q + 1));
    }
    else {
        let temp = arr[p];
        arr[p] = arr[q];
        arr[q] = temp;

        quickSort(arr, len, pivot, q, p_val, q_val);
    }
}

// sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


