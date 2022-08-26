
/**
 * @param {number[]} inputValues
 * @return {boolean}
 */
var isPossible = function (inputValues) {

    const {PriorityQueue} = require('@datastructures-js/priority-queue');
    const minHeap = new MinPriorityQueue({compare: (first, second) => comparator(first, second)});

    for (let value of inputValues) {

        while (!minHeap.isEmpty() && (minHeap.front().endValue + 1 < value)) {
            if (minHeap.front().endValue - minHeap.front().startValue + 1 < 3) {
                return false;
            }
            minHeap.dequeue();
        }

        if (minHeap.isEmpty() || minHeap.front().endValue === value) {
            minHeap.enqueue(new ConsecutiveSubsequence(value, value));
        } else if (!minHeap.isEmpty() && minHeap.front().endValue + 1 === value) {
            minHeap.enqueue(new ConsecutiveSubsequence(minHeap.dequeue().startValue, value));
        }
    }

    while (!minHeap.isEmpty() && (minHeap.front().endValue - minHeap.front().startValue + 1 >= 3)) {
        minHeap.dequeue();
    }
    return minHeap.isEmpty();
};

/**
 * @param {number} startValue
 * @param {number} endValue
 */
function ConsecutiveSubsequence(startValue, endValue) {
    this.startValue = startValue;
    this.endValue = endValue;
}

/**
 * @param {ConsecutiveSubsequence} first
 * @param {ConsecutiveSubsequence} second
 * @return number
 */
function comparator(first, second) {
    let lengthFirst = first.endValue - first.startValue;
    let lengthSecond = second.endValue - second.startValue;
    return (first.endValue === second.endValue) ? lengthFirst - lengthSecond : (first.endValue - second.endValue);
}
