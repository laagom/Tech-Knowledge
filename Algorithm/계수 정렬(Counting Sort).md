## 🔖 계수 정렬이란?
계수 정렬이란 특정한 조건이 부할할 때만 사용할 수 있는 __매우 빠르게 동작하는__ 정렬 알고리즘이다.

### ➤ 조건
- __데이터의 크기 범위가 제한되어 정수 형태로 표현할 수 있을 때__ 사용 가능
- 데이터의 개수가 N, 데이터(양수) 중 최댓값이 K일 때 `최악`의 경우에도 수행 시간 __O(N+K)__를 보장한다.

<br>

## 🔖 계수 정렬 동작
우리가 정렬할 데이터가 아래와 같이 있다.
```python
[7, 5, 9, 0, 3, 1, 6, 2, 9, 1, 4, 8, 0, 5, 2] 
```

### ➤ 계수 리스트 생성
위의 데이터를 계수 정렬 알고리즘으로 정렬시키기위 첫번째 단계는 __데이터의 카운터 수__ 가 들어갈 리스트를 생성시키는 것이다.

> 가장 작은 데이터부터 가장 큰 데이터까지의 범위가 모두 담길 수 있도록 리스트를 생성해야한다.
>
> 위의 데이터가 담긴 리스트는 최소값이 0 최대값이 9이기떄문에 범위가 10인 계수 리스트를 만든다.

![](https://velog.velcdn.com/images/cjyooong/post/af620a6c-aa45-434c-bad7-d62a05a7e8e7/image.png)

### ➤ 데이터 카운터
다음과 같이 만들어진 계수 리스트에 데이터가 담긴 리스트의 각 요소를 확인하면서, 데이터 값에 맞는 (계수리스트의) 인덱스 계수 값을 1씩 증가시킨다.

![](https://velog.velcdn.com/images/cjyooong/post/6d250362-df60-4d27-98b4-1ccdaabf83ce/image.png)

> 0 -2개,
1 -2개,
2 -2개,
3 -1개,
4 -1개,
5 -2개,
6 -1개,
7 -1개,
8 -1개,
9 -2개 

### ➤ 결과 확인
리스트의 첫 번째 데이터부터 하나씩 그 값만큼 반복하여 인덱스를 출력한다.

```python
[0, 0, 1, 1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 9]
```

<br>

## 🔖 코드 구현

### ➤ 함수로 구현
```python
# 모든 원소의 값이 0보다 크거나 같다고 가정
array = [7, 5, 9, 0, 3, 1, 6, 2, 9, 1, 4, 8, 0, 5, 2, 10, 0, 11]
print(f'array : {array}')

# 모든 범위를 포함하는 리스트 선언(모든 값은 0으로 초기화)
count = [0] * (max(array)+1)

for num in array:
    # 각 데이터에 해당하는 인덱스의 값 증가
    count[num] += 1
print(f'count array : {count}')

res = []
for i in range(len(count)):
    for j in range(count[i]):
        res.append(i)

print(f'result array : {res}')

'''
array : [7, 5, 9, 0, 3, 1, 6, 2, 9, 1, 4, 8, 0, 5, 2, 10, 0, 11]
count array : [3, 2, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1]
result array : [0, 0, 0, 1, 1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 9, 10, 11]
'''
```


1. 0~N 까지의 __데이터 배열(array)__ 을 생성
	- 단, 너무 정수가 크면 안되고 음수여도 안된다.
2. 배열의 __최소 값~최대 값까지의 모든 범위가 포함된 계수 배열(count)__ 생성
3. __데이터 배열(array)__ 을 반복문 돌며 계수 배열(count)의 인덱스와 동일하면 +1씩 증가시킴
4. __계수 배열(count)__ 을 순차 적으로 인덱스에 담긴 값 만큼 결과에 담아 준다.

### ➤ 클래스로 구현
```python
# 모든 원소의 값이 0보다 크거나 같다고 가정
array = [7, 5, 9, 0, 3, 1, 6, 2, 9, 1, 4, 8, 0, 5, 2, 10, 0, 11]
print(array)

class CountingSort:
    def __init__(self, array):
        self.array = array

    def sort(self):

        # 카운팅 계수 리스트 생성
        count_array = self.__get_count_array(self.array)

        res = []
        for i in range(len(count_array)):
            for j in range(count_array[i]):
                res.append(i)
        return res

    def __get_count_array(self, array):
        count = [0]*(len(array)+1)
        for num in array:
            count[num] += 1
        return count
    
count_sort = CountingSort(array)
print(count_sort.sort())

'''
array = [7, 5, 9, 0, 3, 1, 6, 2, 9, 1, 4, 8, 0, 5, 2, 10, 0, 11]
result array = [0, 0, 0, 1, 1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 9, 10, 11]
'''
```