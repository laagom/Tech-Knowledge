# 이진 탐색 트리(Binary Search Tree)
이전 자료구조 학습에서 트리(Tree)구조가 어떠한지 알아보았다.

기본적으로 트리(Tree)는 Node와 Edge를 이용해서 사이클을 이루지 않도록 구성한 데이터 구조이다.

트리의 종류는 편향트리(skew tree), 이진트리(Binary Tree), 이진 탐색 트리(Binary Search Tree), m원 탐색 트리(m-way Search Tree), 균형 트리(Balanced Tree) 등이 있는데 이 중 `이진 트리(Binary Tree)형태의 구조`로, `탐색 알고리즘 구현`을 위해 많이 사용된다.

트리에 대한 상세한 내용은 아래 블로그에 설명해 놓았다.

[트리(Tree)](https://github.com/laagom/Tech-Knowledge/blob/main/Computer%20Science/Data%20Structure/%ED%8A%B8%EB%A6%AC(Tree).md)

<br>

## 이진 트리와 이진 탐색 트리
1. 이진 트리 : 노드의 최대 Edge(간선)이 2인 트리구조이다.
2. 이진 탐색 트리(Binary Search Tree, BST) : 이진 트리에 다음과 같은 추가적인 조건이 걸려있는 트리구조이다.

![Alt text](../../resources/binary-search-tree-insertion-animation.gif)

[출처 : www.mathwarehouse.com](https://blog.penjee.com/5-gifs-to-understand-binary-search-tree/#binary-search-tree-insertion-node)

위에서 예시와 같이 `왼쪽 노드는 해당 노드보다 작은 값, 오른쪽 노드는 해당 노드보다 큰 값`을 가지고 있다.

<br>

## 자료 구조 이진 탐색 트리의 용도와 장점
1. 용도 : `데이터 검색(탐색)`
2. 장점 : 탐색 속도를 개선할 수 있음

<br>

### 이진트리와 정렬된 배열간의 탐색 비교

![Alt text](../../resources/binary-search-tree-sorted-array-animation.gif)

[출처 : www.mathwarehouse.com](https://blog.penjee.com/5-gifs-to-understand-binary-search-tree/#binary-search-tree-insertion-node)

위와 같이 `27`의 값을 찾기위해 이진트리는 3번의 탐색을 거치면 마무리가 되고 정렬된 배열에서는 순차적으로 탐색을 해야하기 때문에 모든 원소를 확인해야해서 탐색의 횟수가 많은 것을 알 수 있다.