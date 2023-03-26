### Heap의 자료구조

heapq 모듈은 이진 트리(binary tree) 기반의 최소 힙(min heap) 자료구조를 제공한다.

min heap을 사용하면 원소들이 항상 정렬된 상태로 추가되고 삭제되며, min heap에서 가장 작은 값은 언제나 인덱스 0, 즉 이진 트리의 루트에 위치한다. 내부적으로 min heap내의 모든 원소(d)는 항상 자식 원소들(2d+1, 2d+2)보다 크기가 작거나 같도록 원소가 추가되고 삭제된다.

```
heap[d] <= heap[2*d+1] and heap[d] heap[2*d+2]
```

예를 들어, 아래 그림은 위 공식을 만족시키는 간단한 min heap의 구조를 보여준다.
```text
>         1          ---> root  
>       /   \  
>     3      5  
>   /  \    /  
> 4     8  7
```

<br>

### 내장 모듈 임포트

우선 heapq 모듈은 내장 모듈이기 때문에 파이썬 설치만 되어 있으면 임포트 시켜 사용할 수 있다.

```python
from heapq import heappush, heappop
```

<br>

### 최소 Heap 생성

heapq 모듈에는 파이썬의 List를 최소 힙처럼 다룰 수 있도록 지원해준다.

빈 List를 생성해 놓은 다음 heapq 모듈의 함수를 호출할 때마다 이 List를 인자로 넘겨야 한다. 즉 파이썬에서 heapq 모듈을 통해서 원소를 추가하거나 List가 그냥 최소 힙인 것이다.

```python
heap = []
```

<br>

### 힙에 원소 추가

heapq 모듈의 `heappush()` 함수를 이용하여 힙에 원소를 추가할 수 있다. 첫 번째 인자는 원소를 추가할 대상 List이고 두 번째 인자는 추가할 원소이다.

```python
# 내장 모듈 임포트
from heapq import heappush

# 힙으로 사용될 List 선언
heap = []
heappush(heap, 4)
heappush(heap, 1)
heappush(heap, 7)
heappush(heap, 3)

print(heap)
```

```text
[1, 3, 7, 4]
```

가장 작은 1 이 인덱스 0이며, 인덱스 1(=d)의 값 3은 인덱스 3(2d + 1)에 위치한 4보다 크므로 힙의 공식을 만족한다.

> 내부적으로 이진 트리에 원소를 추가하는 heappush() 함수는 O(log(n))의 시간 복잡도

<br>

### 힙에서 원소 삭제

heapq 모듈의 `heappop()` 함수를 이용하여 힙에서 원소를 삭제할 수 있습니다. 원소를 삭제할 대상 List를 인자로 넘기면, 가장 작은 원소를 삭제 후에 그 값을 리턴한다.

```python
# 내장 모듈 임포트
from heapq import heappop

# heap에서 최소값 제거 후 반환
print(heappop(heap))
print(heap)
```

```text
1
[3, 4, 7]
```

가장 작았던 1이 삭제되어 리턴되었고, 그다음으로 작았던3이 인덱스 0으로 올라온다.

```python
print(heappop(heap))
print(heap)
```

```text
3
[4, 7]
```

가장 작았던3이 삭제되어 리턴되었고, 그다음으로 작았던 4가 인덱스 0으로 올라온다. 내부적으로 이진트리로부터 원소를 삭제하는 heappop() 함수도 역시 O(log(n))의 시간 복잡도를 가진다.

<br>

### 최솟값 삭제하지 않고 얻기

힙에서 최솟값을 삭제하지 않고 단순히 읽기만 하려면 일반적으로 List의 첫 번째 원소에 접근하 듯이 인덱스를 통해 접근하면 된다.

```python
print(heap[0])
```

```text
4
```

여기서 주의사항은 인덱스 0에 가장 작은 원소가 있다고 해서, 인덱스 1에 두 번째 작은 원소, 인덱스 2에 세 번째 작은 원소가 있다는 보장은 없다는 것이다. 왜냐하면 힙은 heappop() 함수를 호출하여 원소를 삭제할 때마다 이진트리의 재배치를 통해 매번 새로운 최솟값을 인덱스 0에 위치시키기 때문이다.

따라서 두 번째로 작은 원소를 얻으려면 바로 heap\[1\]으로 접근하면 안 되고, 반드시 heappop()을 통해 가장 작은 원소를 삭제 후에 heap\[0\]를 통해 새로운 최솟값에 접근해야 한다.

<br>

### 기존 리스트를 힙으로 변환

이미 원소가 들어있는 List를 힙으로 만들려면 heapq 모듈의 `heapify()`라는 함수에 사용하면 된다.

```python
# 내장 모듈 임포트
from heapq import heapify

# 일반 List
heap = [4, 1, 7, 3, 8, 5]
heapify(heap)
print(heap)
```

```text
[1, 3, 5, 4, 8, 7]
```

`heapify()` 함수에 LIst를 인자로 넘기면 LIst 내부의 원소들의 위에서 다룬 힙 구조에 맞게 재배치되며 최솟값이 0번째 인덱스에 위치된다. 즉, 비어있는 LIst를 생성한 후 heappush() 함수로 원소를 하나씩 추가한 효과가 난다. heapify() 함수의 성능은 인자로 넘기는 LIst의 원소수에 비례. 즉 O(n)의 시간 복잡도를 가진다.

`heapify()` 함수를 사용할 때 주의할 점은 새로운 LIst를 반환하는 것이 아니라 인자로 넘긴 LIst에 직접 변경한다. 따라서 원본 LIst의 형태를 보존해야 되는 경우에는 반드시 해당 LIst를 복제한 후에 인자로 넘겨야 하는 걸 기억하라.

```python
nums = [4, 1, 7, 3, 8, 5]

heap = nums[:]
heapify(heap)

print(nums)
print(heap)
```

```text
[4, 1, 7, 3, 8, 5]
[1, 3, 5, 4, 8, 7]
```

<br>

### \[응용\] 최대 힙

heapq 모듈은 최소 힙(min heap)을 기능만을 동작하기 때문에 최대 힙(max heap)으로 활용하려면 약간의 요령이 필요하다. 바로 힙에 튜플(tuple)을 원소로 추가하거나 삭제하면, 튜플 내에서 맨 앞에 있는 값을 기준으로 최소 힙이 구성되는 원리를 이용하면 된다.

따라서, 최대 힙을 만들려면 각 값에 대한 우선순위를 구한 후, (우선 순위, 값) 구조의 튜플(tuple)을 힙에 추가하거나 삭제하면 된다. 그리고 힙에서 값을 읽어올 때는 각 튜플에서 인덱스 1에 있는 값을 취하면 된다.

```python
from heapq import heappush, heappop

nums = [4, 1, 7, 3, 8, 5]
heap = []

for num in nums:
  heappush(heap, (-num, num))  # (우선 순위, 값)

while heap:
  print(heappop(heap)[1])  # index 1
```

```text
8
7
5
4
3
1
```

<br>

### \[응용\] n번째 최솟값/최댓값

최소 힙이나 최대 힙을 사용하면 n 번째로 작은 값이나 n 번째로 큰 값을 효과적으로 구할 수 있다.

n 번째 최솟값을 구하기 위해서는 주어진 배열로 힙을 만든 후, heappop() 함수를 n 번 호출하면 된다.

```
from heapq import heappush, heappop

def nth_smallest(nums, n):
    heap = []
    for num in nums:
        heappush(heap, num)

    nth_min = None
    for _ in range(n):
        nth_min = heappop(heap)

    return nth_min

print(nth_smallest([4, 1, 7, 3, 8, 5], 3))
```

```text
4
```

heapify() 함수를 활용하면 힙을 만들 때 굳이 루프를 돌면서 숫자를 매 번 하나씩 추가해줄 필요가 없다.

```python
from heapq import heapify, heappop

def nth_smallest(nums, n):
    heapify(nums)

    nth_min = None
    for _ in range(n):
        nth_min = heappop(nums)

    return nth_min
```

사실 heapq 모듈에 이미 이러한 용도로 사용할 수 있는 `nsmallest()`라는 함수가 존재한다. `nsmallest()` 함수는 주어진 List에서 가장 작은 n개의 값을 담은 List를 반환하는데 그 결과 List의 마지막 값이 n 번째 작은 값이 된다.

```python
from heapq import nsmallest

nsmallest(3, [4, 1, 7, 3, 8, 5])[-1]
```

반대로 n 번째 최댓값을 구할 때는 `nlargest()` 함수를 사용하면 된다.

```python
from heapq import nlargest

nlargest(3, [4, 1, 7, 3, 8, 5])[-1]
```

### \[응용\] 힙 정렬

힙 정렬(heap sort)은 위에서 설명드린 힙 자료구조의 성질을 이용한 대표적인 정렬 알고리즘이다.

```python
from heapq import heappush, heappop

def heap_sort(nums):
  heap = []
  for num in nums:
    heappush(heap, num)

  sorted_nums = []
  while heap:
    sorted_nums.append(heappop(heap))
  return sorted_nums

print(heap_sort([4, 1, 7, 3, 8, 5]))
```

```text
[1, 3, 4, 5, 7, 8]
```

> 취업 준비를 하면서 코테를 푸는 와중에 기본 파이썬 과정에는 배우지 못한 Heap개념이 존재하길래 포스팅해와서 내 블로그에 작성해 보았다. 본문에 따르면 List나 Dict처럼 매일 사용하는 자료구조는 아니지만 사용할 때가 분명히 있을 거라고 하니 믿고 학습해 보았다.

<br>

### 참고

 [파이썬의 heapq 모듈로 힙 자료구조 사용하기](https://www.daleseo.com/python-heapq/)