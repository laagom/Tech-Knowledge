클라이언트(사용자)가 요청을 보냈을 때 WAS로 동적 컨텐츠 요청을 전달해주는 웹 서버 중 하나인 Nginx에 대해 알아보려고 한다.

<br>

## 🔖 Nginx
클라이언트의 요청을 받아 정적 컨텐츠를 응답으로 넘겨주거나, 동적 컨텐츠 요청을 WAS로 전달해 주는 웹 서버(Web Server)중 하나인 소프트웨어이다.

_특히 트래픽이 많은 웹사이트를 확장하기 위해 설계한 `비동기` 이벤트 기반구조의 웹 서버 소프트웨어이다._

> __더 적은 자원으로 더 빠르게 서비스한다.__

이 프로그램은 __가벼움__ 과 __높은 성능__ 을 목표로 만들어 졌으며 Apache의 C10K Problem을 해결하기 위해 만든 Event-driven구조의 오픈소스 서버 프로그램이다.

> __📌 C10K Problem이란?__<br>
> 한 웹서버에 1만개의 클라이언트 접속을 동시에 다룰 수 있는 기술적인 문제

<br>

### ➤ Nginx 흐름
![](https://velog.velcdn.com/images/cjyooong/post/1c61adaa-5e08-4162-a38b-3866928fb750/image.png)

Nginx는 __Event-Driven구조__ 로 동작하기 때문에 한 개 또는 고정된 프로세스만 생성하고 사용한다.

__비동기 방식으로__ 요청들을 동시성을 가지고(concurrency) 처리할 수 있다.

위의 그림으로 설명을 하자면 Nginx는 새로운 요청이 들어오더라도 새로운 프로세스와 쓰레드를 생성하지 않기 때문에 프로세스와 쓰레드 생성 비용이 존재하지 않고, __적은 자원으로 효율적인 운용__ 이 가능하다.

<br>

### ➤ Nginx의 구조
Nginx는 하나의 Master Process와 다수의 Worker Process로 구성되어 실생된다.

- Master Process : 설정 파일을 읽고, 유효성을 검사 및 Worker Process를 관리
- Worker Process : 모든 요청을 처리

Nginx는 이벤트 기반 모델을 사용하며, Worker Process사이에 요청을 효율적으로 분배하기 위해 OS에 의존적인 메커니즘을 사용한다.

Worker Process의 개수는 설정 파일에서 정의되며, 정의된 프로세스 개수와 사용 가능한 CPU 코어 숫자에 맞게 자동으로 조정된다.
![](https://velog.velcdn.com/images/cjyooong/post/3b5924fd-cb46-40a3-b626-d1299a2870ef/image.png)

<br>

## 🔖 출처
[https://velog.io/@wijihoon123/Nginx%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80](https://velog.io/@wijihoon123/Nginx%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)