# 해시(Hash)
일반적으로 말하는 `해시(Hash)`는 해시 테이블(Hash Table)로 Key와 Value를 매핑해서 데이터를 저장하는 자료구조이다. `Python에서는 기본적으로 제공되는 딕셔너리 자료형이 해시 테이블과 동일한 구조를 가진다.`

`해시`에 대해 자세히 학습하기 전에 `해시`에 사용되는 용어 먼저 알아보고 가자

<br>

## 용어
1. `키(Key)`: 고유의 값으로 해시 함수의 Input에 해당. 다양한 길이의 값이 될 수 있다.
2. `해시 테이블(Hash Table) or 해시 맵(Hash Map)`: Key와 Value를 매핑해서 데이터를 저장하는 자료구조이다.
3. `해시 함수(Hash Function)`: 임의의 값을 고정된 길이의 데이터로 변환하는 함수. 다양한 길이의 키를 고정된 길이의 해시로 변환시키므로 저장소를 효율적으로 운영할 수 있게 해준다.
4. `해시(Hash)`: 해시 함수의 output으로 해시 값과 매칭되어 버킷에 저장된다.
5. `해시 값(Hash Value)`: 키에 해시 함수를 적용하여 얻는 해시 값
6. `버킷(Bucket)`: 한 개의 데이터를 저장할 수 있는 공간
<br>

![Alt text](../../resources/hash-structure-001.png)

다양한 길이를 가지고 있는 Key값에 해시 함수를 적용시키면 00, 01, 02와 같이 고정된 길이의 데이터로 변환된다. 이렇게 변환된 데이터가 `해시 값`이고, 버킷에는 키와 매핑된 원래 데이터를 저장하게 된다. `결과적으로 변환된 키값과 버킷에 매핑되어 있는 데이터를 해시라 하고 이러한 자료구조를 해시 테이블`이라고 한다.

<br>

## 사용 용도
위에서 해시는 Key, Value구조로 데이터를 저장하는 해시 테이블이라고 설명을 했다. 이러한 해시는 언제 사용하면 좋을까?

<br>

### `리스트를 사용할 수 없을 때`
리스트는 숫자 인덱스를 이용하여 원소에 접근하는데 list[1]의 형식으로 접근은 가능하지만 list['a']와 같은 형식으로는 접근이 불가능하다. 즉, 인덱스 값을 숫자가 아닌 문자열, Boolean 등과 같은 자료형을 사용할 때 해시(Python에서의 딕셔너리)를 사용하면 좋다.

<br>

### `빠른 접근/탐색이 필요할 때`
해시(Python에서의 딕셔너리) 함수의 시간복잡도는 대부분 O(1)이므로 아주 빠른 자료구조이므로 List보다 빠른 접근과 탑색이 필요할 때 사용하면 좋다.

<br>

### `집계가 필요할 때`
원소의 개수를 세는 문제는 코딩 테스트에서 많이 출제되는 문제이다. 이때 해시와, Collections모듈의 Counter 클래스를 사용하면 아주 빠르게 문제를 풀 수 있을 것이다.

<br>

## 딕셔너리와 리스트의 시간 복잡도 차이
위의 설명에서 딕셔너리의 시간 복잡도는 대부분 O(1)을 갖는다고 했다. 아래 표를 이용하여 리스트와 시간복잡도를 비교해 보자.

|Operation|Dictionary|List|
|---------|----------|----|
|**Get Item**|O(1)|O(1)|
|**Inser Item**|O(1)|O(1)~O(N)|
|**Update Item**|O(1)|O(1)|
|**Delete Item**|O(1)|O(1)~O(N)|
|**Search Item**|O(1)|O(N)|

List에 비해 Dictionary가 매우 빠른 시간복잡도를 갖는 것을 볼 수 있다. 즉, 원소를 넣거나 삭제, 찾는 일이 많을 때에는 딕셔너리를 사용하는 것이 좋다.<br>
<span style='color:red;'>❊ Python3.7 이상부터 딕셔너리는 원소가 들어온 순서를 보장하게 되었다. 반면, Python3.7미만은 순서를 보장하지 않는다고 한다.</span>


<br>

## Dictionary 사용법
### ```Init```
{}를 사용하거나 dict함수 호출 시 빈 딕셔너리를 선언할 수 있다. Key-Value쌍을 가지는 Dictionary선언도 바로 가능하다.
```python
# 딕셔너리 생성하기
init_dict1 = {}
init_dict2 = dict()

print(init_dict1)   # {}
print(init_dict2)   # {}
```
```python
# Key-Value쌍을 가지는 특정 dictionary 선언
Lagom = {
    'name' : '조OO',
    'age' : 32,
    'marital' : False,
    'height' : 183,
}

Lagom
'''
{'name': '조OO', 'age': 32, 'marital': False, 'height': 183}
'''
```
```python
# dictionary를 value로 가지는 dictionary 선언
Lagom = {
    'name' : '조OO',
    'age' : 32,
    'marital' : False,
    'height' : 183,
    'Friend' : {
        'MinWook',
        'Jinho'
    }
}

Lagom
'''
{'name': '조OO',
 'age': 32,
 'marital': False,
 'height': 183,
 'Friend': {'Jinho', 'MinWook'}}
'''
```

<br>

### `Get`
Dictionary에서 원소를 가져오는 2가지 방법 [], get메소드 가 존재한다.

1. get메소드는 get(key, x)로 사용을 할 수 있으며, key가 존재하지 않을 때 x를 반환해준다.
```python
# [] 기호로 원소 가져오기
Lagom = {
    'name' : '조OO',
    'age' : 32,
    'marital' : False,
    'height' : 183,
    'Friend' : {
        'MinWook',
        'Jinho'
    }
}
Lagom['name']

'''
'조OO'
'''
```
```python
# get 메소드로 원소 가져오기
# 딕셔너리에 해당 key가 없는 경우 error를 발생하는 대신 특정 값을 가져오게 하기
Lagom = {
    'name' : '조OO',
    'age' : 32,
    'marital' : False,
    'height' : 183,
    'Friend' : {
        'MinWook',
        'Jinho'
    }
}

Lagom.get('weight', 80)

'''
80
'''
```

<br>

### `Set`
Dictionary에 값을 넣거나 수정할 때 []를 사용한다.
```python
# 값 넣기
Lagom = {
    'name' : '조OO',
    'age' : 32,
    'marital' : False,
    'height' : 183,
    'Friend' : {
        'MinWook',
        'Jinho'
    }
}
Lagom['weight'] = 80
Lagom

'''
{'name': '조OO',
 'age': 32,
 'marital': False,
 'height': 183,
 'Friend': {'Jinho', 'MinWook'},
 'weight': 80}
'''
```
```python
# 값 수정
Lagom = {
    'name' : '조OO',
    'age' : 32,
    'marital' : False,
    'height' : 183,
    'Friend' : {
        'MinWook',
        'Jinho'
    }
}
Lagom['name'] = '박OO'
Lagom

'''
{'name': '박OO',
 'age': 32,
 'marital': False,
 'height': 183,
 'Friend': {'Jinho', 'MinWook'}}
'''
```

<br>

### ```Delete```
Dictionary에서 특정 key값을 지울때 아래와 같은 방법을 이용할 수 있다.<br>
1. del dict_obj[key]<br>
del 은 키워드로써, 만약 Dictionary에 key가 없다면 keyError가 발생한다.
2. pop(key, [default])<br>
pop은 메소드로써, pop메소드는 key값에 해당하는 value를 리턴한다. key가 없다면 두번째 파라미터인 default를 리턴한다. 만약 default설정하지 않았을 경우 keyError가 발생한다.
```python
# del 이용하기 - 키가 있는 경우
Lagom = {
    'name' : '조OO',
    'age' : 32,
    'marital' : False,
    'height' : 183,
    'Friend' : {
        'MinWook',
        'Jinho'
    }
}
del Lagom['name']

Lagom

'''
{'age': 32, 'marital': False, 'height': 183, 'Friend': {'Jinho', 'MinWook'}}
'''
```
```python
#  del 이용하기 - 키가 없는 경우 raise KeyError
Lagom = {
    'name' : '조OO',
    'age' : 32,
    'marital' : False,
    'height' : 183,
    'Friend' : {
        'MinWook',
        'Jinho'
    }
}
del Lagom['weight']

'''
KeyError                                  Traceback (most recent call last)
Cell In [14], line 11
      1 Lagom = {
      2     'name' : '조OO',
      3     'age' : 32,
   (...)
      9     }
     10 }
---> 11 del Lagom['weight']

KeyError: 'weight'
'''
```
```python
# pop 이용하기 - 키가 있는 경우 대응하는 value 리턴
Lagom = {
    'name' : '조OO',
    'age' : 32,
    'marital' : False,
    'height' : 183,
    'Friend' : {
        'MinWook',
        'Jinho'
    }
}
Lagom.pop('age', 18)

'''
32
'''
```
```python
# pop 이용하기 - 키가 없는 경우 대응하는 default 리턴
Lagom = {
    'name' : '조OO',
    'age' : 32,
    'marital' : False,
    'height' : 183,
    'Friend' : {
        'MinWook',
        'Jinho'
    }
}
Lagom.pop('weight', 18)

'''
18
'''
```

<br>

### `Iterate`
Dictionary를 for문을 이용하여 조회할 때 두가지 방법

1. key로 순회하기
2. key, value동시 순회하기(item() 사용)

```python
Lagom = {
    'name' : '조OO',
    'age' : 32,
    'marital' : False,
    'height' : 183,
    'Friend' : {
        'MinWook',
        'Jinho'
    }
}
for key in Lagom:
    print(key)

'''
name
age
marital
height
Friend
'''
```

```python
Lagom = {
    'name' : '조OO',
    'age' : 32,
    'marital' : False,
    'height' : 183,
    'Friend' : {
        'MinWook',
        'Jinho'
    }
}
for key, value in Lagom.items():
    print(key, value)

'''
name 조OO
age 32
marital False
height 183
Friend {'Jinho', 'MinWook'}
'''
```

## 그 외 Dictionary 팁
1. 특정 키 유무 확인 
```python
print('name' in {'name' : '조OO', 'age' : 32})
```
2. key 또는 value만 뽑아내는 방법
```python
{'name' : '조OO', 'age' : 32}.keys()
{'name' : '조OO', 'age' : 32}.values()
```

