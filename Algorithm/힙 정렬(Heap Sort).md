# 힙 정렬(Heap Sort)
힙 정렬은 정렬하고자하는 데이터를 최소 힙 또는 최대 힙으로 변경하여 순서대로 정렬하는 알고리즘이다. 이전 글에서 힙의 구조와 구현에 대해 학습했기 때문에 [여기](https://github.com/laagom/Tech-Knowledge/blob/main/Language/Python/%ED%9E%99(Heap)%20in%20%ED%8C%8C%EC%9D%B4%EC%8D%AC.md)를 참고하자

<br>

## 힙 정렬 개념
1. 주어진 원소들로 최대 힙을 만든다.
2. 최대 힙의 경우 루느노드의 값과 마지막 노드의 값을 교환한다. 
3. 교환을 통해 루트노드는 배열의 마지막 위치를 찾게 되는 것이고 
4. 마지막 노드를 찾기 위해 정렬하게 되면 루트 노드에 위치한 새로운 값이 새로운 루트노드로서 이전 루트 노드 값을 제외하고 이 힙 구조에서 가장 큰 값이 된다.
5. 이를 반복하게 되면 큰 값부터 배열의 뒤에서 정렬이 되는 힙 정렬이 완성된다.

<br>

## 코드
```python
import random

# 힙 정렬
class HeapSort:
    def __init__(self, array):
        self.array = array

    # 최대 힙 만들기
    def maxheap(self):
        length = len(self.array)

        for i in range(1, length):
            child = i
            while child != 0:
                # 부모 노드 index
                parent = (child-1)//2 

                # 자식노드가 부모노드보다 크면 위치 변경
                if self.array[parent] < self.array[child]:
                    self.array[parent], array[child] = self.array[child], self.array[parent]
                # 최대값이 루트까지 도달할 수 있도록
                child = parent
        return self.array

    # 정렬
    def sort(self):
        length = len(self.array)

        # 끝에서 루트로 역으로 탐색
        for node in range(length-1, -1, -1):
            # 루트노드를 가장 끝으로 보냄
            self.array[0], self.array[node] = self.array[node], self.array[0]
            parent = 0
            child = 1

            # 마지막 노드 자리로 보내준 루트 노드를 제외한 가장 큰 값 찾기
            # 루트 노드 자리로 온 마지막 노드의 자리 찾기
            while child < node:
                child = parent*2 +1
                if child < node-1 and self.array[child] < self.array[child+1]:
                    child += 1
                
                if child < node and self.array[parent] < self.array[child]:
                    self.array[parent], self.array[child] = self.array[child], self.array[parent]

                parent = child
        return self.array

if __name__ == '__main__':
    array = random.sample(range(0, 10), 10)
    print(array)

    heap = HeapSort(array)
    print(heap.maxheap())
    print(heap.sort())
```


