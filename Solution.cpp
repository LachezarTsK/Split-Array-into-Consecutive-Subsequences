
#include <queue>
#include <vector>
using namespace std;

class Solution {

    struct ConsecutiveSubsequence {
        int startValue{};
        int endValue{};
        ConsecutiveSubsequence(int startValue, int endValue) : startValue{startValue}, endValue{endValue}{}
    };

    auto inline static comparator = [](const ConsecutiveSubsequence& first, const ConsecutiveSubsequence& second) {
        int lengthFirst = first.endValue - first.startValue;
        int lengthSecond = second.endValue - second.startValue;
        return (first.endValue == second.endValue) ? lengthFirst > lengthSecond : (first.endValue > second.endValue);
    };

public:
    bool isPossible(vector<int>& inputValues) {

        priority_queue<ConsecutiveSubsequence, vector<ConsecutiveSubsequence>, decltype(comparator) > minHeap(comparator);

        for (const auto& value : inputValues) {

            while (!minHeap.empty() && (minHeap.top().endValue + 1 < value)) {
                if (minHeap.top().endValue - minHeap.top().startValue + 1 < 3) {
                    return false;
                }
                minHeap.pop();
            }

            if (minHeap.empty() || minHeap.top().endValue == value) {
                minHeap.emplace(ConsecutiveSubsequence(value, value));
            } else if (!minHeap.empty() && minHeap.top().endValue + 1 == value) {
                minHeap.emplace(ConsecutiveSubsequence(minHeap.top().startValue, value));
                minHeap.pop();
            }
        }

        while (!minHeap.empty() && (minHeap.top().endValue - minHeap.top().startValue + 1 >= 3)) {
            minHeap.pop();
        }
        return minHeap.empty();
    }
};
