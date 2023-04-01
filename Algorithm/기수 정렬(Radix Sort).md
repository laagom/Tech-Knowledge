## 🔖 기수 정렬(Radix Sort)
기수 정렬 (Radix Sort) 다른 정렬과 다르게 크고 작은지 판단하는 `비교연산`을 하지 않는다.

`비교연산`은 정렬 알고리즘의 핵심이다. 그 이유는 정렬을 진행하기 위해선 두 데이터의 정렬순서상의 우선순위를 판단해야하기 때문이다. 하지만 이러한 비교연산을 필요로 하지 않는 정렬이 바로 `기수 정렬(Radix Sort)`이다.

### 시간 복잡도
- 정렬 알고리즘의 이론상 성능의 한계는 O(nlog2n)이다.
- 하지만 기수 정렬은 이러한 한계를 넘어설 수 있는 유일한 알고리즘이다.

### 장점
- 자릿수가 고정되어 있어 `안정적`이다.
- 문자열, 정수 정렬이 가능하다.
- `비교연산`을 하지 않아 `정렬 속도가 빠르다.`

### 단점
- `적용할 수 있는 범위가 제한적이다.`
- [1, 7, 9, 5, 2, 6] 배열을 오름차순으로 정렬 시 `기수 정렬`로 바로 해결이 가능하다.
- 하지만 [21, -9, 125, 8, -136, 45] 배열은 `기수 정렬`로 오름차순 정렬이 불가능하다.
- 중간 결과를 저장할 bucket공간을 만들기 위한 `메모리가 더 필요`하다.

 즉, `기수 정렬`로 데이터들을 정렬이 가능한 요구사항은 바로 `데이터의 길이`가 동일해야한다는 점이다. 물론 정렬의 대상이나 기준에 따라서 길이가 다른 데이터들도 정렬이 가능할 수 있다. 하지만 이 경우는 매우 제한적이다.

## 🔖 동작 원리
![](https://velog.velcdn.com/images/cjyooong/post/e58f8d60-1ea0-4d84-9644-cd5eff52320c/image.png)
다음과 같이 동일한 자리수의 값을 가진 배열이 있다. 이 배열을 `기수 정렬` 알고리즘으로 정렬을 진행해보려고 한다.

`기수 정렬`은 `분배`와 `합체`를 번갈아가며 반복하여 정렬은 진행한다.

- 분배 : 가장 낮은 자리 수부터 시작하여 숫자별로 버킷에 분배한다.
- 합체 : 분배된 항목들을 하나의 리스트로 모아준다.

![](https://velog.velcdn.com/images/cjyooong/post/3019a15e-999c-430a-a0d6-07b708135d6b/image.png)

위 그림과 같이 10진수 정수의 정렬을 진행하기 위해서는 0~9까지의 `버킷`이 필요하다. 그리고 각 가장 낮은 자리 수에 따라 버킷에 `분배`를 진행해 준다.

__첫번째 자리수(일)__
![](https://velog.velcdn.com/images/cjyooong/post/711881c3-df40-4b4e-8b6b-ab911d331c78/image.png)

`분배`를 진행한 것을 0~9까지 순서대로 나열하며 하나의 배열에 `합체`를 진행한다. 여기까지가 '기수 정렬의 기본 원리'이다.

지금은 가장 낮은 자리수를 가지고 분배와 합체를 진행하였다. 다음은 두번째 자리수, 10의 자리수를 가지고 분배와 합체를 진행해 볼 것이다.

__두번째 자리수(십)__
![](https://velog.velcdn.com/images/cjyooong/post/2fb047af-c958-42f2-a4c0-d901e2c25b41/image.png)

__세번째 자리수(백)__
![](https://velog.velcdn.com/images/cjyooong/post/77f462bb-3ab5-4992-a64b-1518a59f53da/image.png)


__네번째 자리수(천)__
![](https://velog.velcdn.com/images/cjyooong/post/26fafaea-0211-48f0-8133-5e3812881647/image.png)


---
![](https://velog.velcdn.com/images/cjyooong/post/6a4b71f8-3c66-4e4a-86da-1a6cf27f8b73/image.png)


이로써 오름차순으로 정렬이 완료되었다. 하지만 우리는 이 과정이 간단해 보이지만 익숙하지 않을 것이다. 그 이유는 수의 대소를 비교할 때 큰 자릿수부터 비교하는데 익숙하기 때문이다.

이 `기수 정렬`의 단점은 가장 큰 영향력을 가진 큰 자릿수를 마지막에 비교하다 보니 마지막까지 결과를 알 수 없는 것이다.


<br>

## 🔖 코드 구현
```python
# 기수 정렬
def radix_sort(items: list):

    # 끝자리부터 비교
    pointer = -1

    # 최대값의 길이
    max_len = max([len(str(item)) for item in items])

    for i in range(max_len):
        # 분배를 위한 버킷 생성
        buckit = [[] for __ in range(10)]

        for item in items:
            radix = 0
            try:
                # item에 자리수 값 선정
                radix = int(str(item)[pointer])
            except IndexError:
                pass

            # 자리수 값을 생성한 버킷에 분배
            buckit[radix].append(item)
        
        items = []
        for x in range(10):
            for y in range(len(buckit[x])):
                items.append(buckit[x][y])
        pointer -= 1
        print(f'{i + 1} 회차 정렬 : {items}')
    return items

radix = ['0508', '0515', '0915', '1111', '0101', '0301', '0815']
print(radix)
print(radix_sort(radix))

'''
['0508', '0515', '0915', '1111', '0101', '0301', '0815']
1 회차 정렬 : ['1111', '0101', '0301', '0515', '0915', '0815', '0508']
2 회차 정렬 : ['0101', '0301', '0508', '1111', '0515', '0915', '0815']
3 회차 정렬 : ['0101', '1111', '0301', '0508', '0515', '0815', '0915']
4 회차 정렬 : ['0101', '0301', '0508', '0515', '0815', '0915', '1111']
['0101', '0301', '0508', '0515', '0815', '0915', '1111']
'''
```

## 🔖 참고
[https://www.youtube.com/watch?v=onEazVf_NyI](https://www.youtube.com/watch?v=onEazVf_NyI)

[https://nomad-programmer.tistory.com/390](https://nomad-programmer.tistory.com/390)

[https://velog.io/@april_5/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B8%B0%EC%88%98-%EC%A0%95%EB%A0%ACRadix-Sort](https://velog.io/@april_5/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B8%B0%EC%88%98-%EC%A0%95%EB%A0%ACRadix-Sort)