
import java.util.PriorityQueue;

public class Solution {

    private record ConsecutiveSubsequence(int startValue, int endValue) {}

    public boolean isPossible(int[] inputValues) {

        PriorityQueue<ConsecutiveSubsequence> minHeap = new PriorityQueue<>((first, second) -> comparator(first, second));

        for (int value : inputValues) {

            while (!minHeap.isEmpty() && (minHeap.peek().endValue + 1 < value)) {
                if (minHeap.peek().endValue - minHeap.peek().startValue + 1 < 3) {
                    return false;
                }
                minHeap.poll();
            }

            if (minHeap.isEmpty() || minHeap.peek().endValue == value) {
                minHeap.add(new ConsecutiveSubsequence(value, value));
            } else if (!minHeap.isEmpty() && minHeap.peek().endValue + 1 == value) {
                minHeap.add(new ConsecutiveSubsequence(minHeap.poll().startValue, value));
            }
        }

        while (!minHeap.isEmpty() && (minHeap.peek().endValue - minHeap.peek().startValue + 1 >= 3)) {
            minHeap.poll();
        }
        return minHeap.isEmpty();
    }

    private int comparator(ConsecutiveSubsequence first, ConsecutiveSubsequence second) {
        int lengthFirst = first.endValue - first.startValue;
        int lengthSecond = second.endValue - second.startValue;
        return (first.endValue == second.endValue) ? lengthFirst - lengthSecond : (first.endValue - second.endValue);
    }
}
