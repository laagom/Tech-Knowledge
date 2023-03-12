# 연결 리스트(Linked List) in Python
연결 리스트(Linked List)는 `(데이터와 다음 노드의 주소를 담고 있는)노드`들이 한 줄로 연결되어 있는 방식의 자료구조이다.

![Alt text](../../resources/linked%20list_node-001.jpeg)
연결되는 방향에 따라 `단일 연결 리스트(Singly Linked List)`, `이중 연결 리스트(Doubly Linked List)`, `환형 연결 리스트(Circular Linked List)` 세 가지가 존재한다.

<br>

## 연결 리스트(Linked list)란?
연결 리스트(Linked List)는 데이터를 노드의 형태로 저장한다. 노드에는 `데이터(값)`와 `다음 노드를 가르키는 포인터`를 담은 구조로 이루어져 있다.

![Alt text](../../resources/linked%20list_node-002.jpeg)

연결 리스트(Linked List는 Array)는 배열(Array) 처럼 `선형 데이터 자료구조`이지만, 배열(Array)는 물리적인 배치 구조 자체가 연속적으로 저장되어 있고 Linked list는 위의 노드의 Next부분에 다음 노드의 위치를 저장함으로써 선형적인 데이터 자료구조를 가진다.

Python 내장 함수의 시간 복잡도에서 List의 삽입과 삭제의 시간 복잡도가 O(N)이 걸리는 것은 배열이 물리적인 데이터의 저장 위치가 연속적이어야 하므로 데이터를 옮기는 연산작업이 필요하기 때문이다.
<br>
** 참고 : 배열(Array)의 삽입과 삭제는 O(1)의 시간복잡도를 가진다. 하지만 해당 인덱스를 찾아야하는 경우 검색의 시간 복잡도인 O(N)에 해당한다.

하지만 Linked List는 데이터를 삽입, 삭제할 경우, 노드의 Next 부분에 저장한 다음 노드의 포인터만 변경해주면 되므로 배열과 비교하였을 때 Linked List가 `효율적으로` 데이터를 `삽입`, `삭제` 할 수 있다.

그러나 안타깝게도 이러한 Linked List에서 특정 위치의 데이터를 탐색하기 위해서는 첫 노드부터 탐색을 시작해야한다. 그 시간이 O(N)만큼 걸리게 되므로 탐색에 있어서는 배열이나 트리 구조에 비해 상대적으로 느리다고 할 수 있다.

<br>

### Linked List의 장점
- Linked List의 길이를 동적으로 조절 가능
- 데이터의 삽입과 삭제가 쉬움

<br>

### Linked List의 단점
- 임의의 노드에 바로 접근할 수가 없음
- 다음 노드의 위치를 저장하기 위한 추가 공간이 필요함
- Cache loclity를 활용해 근접 데이터를 사전에 캐시에 저장하기가 어려움
- Linked List를 거꾸로 탐색하기 어려움
<br>
** cache locality : `대부분 프로그램은 한번 사용한 데이터를 다시 사용할 가능성이 높고, 그 주변의 데이터도 곧 사용할 가능성이 높은 데이터 지역성`을 가지고 있다. 데이터 지역성을 활용하여 메인 메모리에 있는 데이터를 캐시 메모리에 불러와 두고, CPU가 필요한 데이터를 캐시에서 먼저 찾도록 하면 시스템 성능을 향상시킬 수 있다. 

<br>

## 단일 연결 리스트(Singly Linked List) 구현하기
단일 연결 리스트는 각 노드에 자료 공간과 한 개의 포인터 공간(다음 노드의 주소를 담는 공간)이 있고, 각 노드의 포인터는 다음 노드를 가리킨다.

### # 삽입

![Alt text](../../resources/linked%20list_node_insertion-001.png)

### # 삭제

![Alt text](../../resources/linked%20list_node_delete-001.png)


### # 코드
```python
# Node 클래스 선언
class Node (object):
    # 데이터만 인자로 전달 받고 Node 생성 시, next주소를 저장하지 않음
    def __init__(self, data):
        self.data = data
        self.next = None

# Singly Linked List 선언
class SinglyLinkedList(object):
    def __init__(self):
        self.head = None
        self.count = 0

    # 연결 리스트 끝에 새 Node 추가
    def append(self, node):
        # Node 형태가 들어오지 않았을 경우 예외 처리
        try:
            if not isinstance(node, Node):
                raise
        except TypeError as e:
            print(f"Type Error! {e}")

        # head : 생성된 연결 리스트의 제일 첫 Node
        # 첫 Node가 존재하지 않으면 입력 받은 node를 head에 추가
        if self.head == None:
            self.head = node
        else:
            current = self.head
            while current.next != None:
                current = current.next
            current.next = node

    # 출력
    def __str__(self):
        current = self.head
        string = ""

        while current:
            string += str(current.data)
            if current.next:
                string += "->"
            current = current.next
        return string

    def getIndex(self, data):
        current = self.head
        index = 0
        while current:
            if current.data == data:
                return index
            current = current.next
            index += 1

        return index
    
    # node를 원하는 index에 추가
    def insert(self, index, node):
        current = self.head
        prev = None
        current_index = 0

        # index 0에 node 추가
        if index == 0:
            if current:
                next_node = current
                self.head = node
                self.head.next = next_node
            else:
                self.head = node
        
        else:
            while current_index < index:
                if current:
                    prev = current
                    current = current.next
                else:
                    break
                current_index += 1
            if current_index == index:
                node.next = current
                prev.next = node
            else:
                return -1
            

# 현재 페이지 실행
if __name__ == "__main__":
    sll = SinglyLinkedList()

    print(sll)
    sll.append(Node(1))
    sll.append(Node(2))
    sll.append(Node(3))

    print(f'sll.getIndex(1) : {sll.getIndex(1)}')
    print(f'sll.getIndex(2) : {sll.getIndex(2)}')
    print(f'sll.getIndex(3) : {sll.getIndex(3)}')
    print(sll)

    sll.insert(1, Node(11))
    print(sll)

```

