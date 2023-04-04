서버 개발에 있어 가장 기본이 되는 __웹 서버(Web Server)__ 와 __WAS(Web Application Server)__ 개념을 다뤄보려고 한다.

## 🔖 웹 서버(Web Server)
### ➤ 웹 서버 개념
- 하드웨어
: Web 서버가 설치되어 있는 컴퓨터

- 소프트웨어
: 웹 브라우저 클라이언트로부터 HTTP요청을 받아 정적인 컨텐츠를 제공하는 컴퓨터 프로그램

지금 다루려는 개념은 `소프트웨어`쪽 개념이다.

웹 서버란 사용자(클라이언트)가 브라우저를 이용하며 어떤 요청을 보냈을때, 웹 서버가 그 요청을 받아 클라이언트에서 __*정적인 컨텐츠를 제공__ 하는 역할을 한다.

또한 동적인 요청을 받으면 웹 서버가 WAS에게 요청을 넘겨주고, WAS가 처리한 결과를 다시 받아 클라이언트에게 전달해 준다.

이렇게 사용되는 웹 서버에는 __Apache__ , __Nginx__ , __IIS(Windows 전용)__ 등이 존재한다.

> __📌 정적인 컨텐츠란?__
: 단순 HTML 문서나 CSS, JS, IMAGES 파일 등 바로 응답이 가능한 컨텐츠를 말한다.

<br>

## 🔖 WAS(Wap Application Server)
### ➤ WAS 개념
: WAS는 인터넷 상에서 HTTP프로토콜을 통해 사용자 컴퓨터나 장치에 애플리케이션을 수행해주는 미들웨어, 주로 __동적 서버 컨텐츠__ 를 수행하는 것으로 웹 서버와 구별되며, 데이터베이스 서버와 같이 수행된다.

WAS는 구조상 웹 서버와 웹 컨테이너가 합친 개념으로 웹 서버가 처리할 수 없고 데이터베이스에서 로직처리가 필요한 __동적인 컨텐츠__ 를 처리하여 웹 서버에 전달하는 역할을 한다.

물론 웹 서버가 하는 역할인 __정적인 컨텐츠__ 도 처리할 수 있다.

이렇게 사용되는 WAS는 __Tomcat__  , __uwsgi__ , __gunicorn__ 등이 있다.

### ➤ WAS 상세기능
동적인 컨텐츠를 처리한다고 설명했지만 정확한 기능은 아래와 같다.
- 프로그램 실행 환경과 DB 접속 기능 제공
- 여러 개의 트랜잭션(논리적인 작업 단위)관리 기능
- 업무를 처리하는 비즈니스 로직 수행

<br>

## 🔖 Web Service 구조
__📌 Client -> Web Server -> WAS -> DB__
![](https://velog.velcdn.com/images/cjyooong/post/c0cb52b5-649a-40d7-97df-f1bfb682951f/image.png)
1. Web Server가 Client로 부터 HTTP요청을 받음
2. Web Server는 Client의 요청이 동적 컨텐츠 요청인지 정적 컨텐츠 요청인지 파악
3-1. 정적 컨텐츠에대한 요청인 경우 Web Server가 바로 응답<br>
3-2. 동적 컨텐츠에 대한 요청인 경우 요청을 WAS로 전달(내부의 Web Container가 받음)
4. WAS는 관련된 Servlet을 메모리에 올림
5. WAS는 web.xml을 참조하여 해당 Servlet에 대한 Thread 생성
6. HttpServletRequest와 HttpServletResponse객체를 생성하여 Servlet에 전달
7. doGet()또는 doPost() 메서드는 인자에 맞게 생성된 동적 페이지를 Response 객체에 담아 WAS에 전달
8. WAS는 Reponse객체를 HttpReponse형태로 바꾸어 WebServer에 전달
9. 생성된 Thread를 종료하고, HttpServletRequest와 HttpServletReponse객체를 제거

<br>

## 🔖 웹 서버와 WAS를 구분하는 이유
![](https://velog.velcdn.com/images/cjyooong/post/9255e1a8-91b1-4370-8bbf-348e8b878fa1/image.png)

__📌 Web Server가 필요한 이유는 무엇일까?__

클라이언트에 정적 컨텐츠인 __이미지 파일__ 이 전달될 때 동일한 정적 컨텐츠인 HTML문서와 함께 전달되는 것이 아니다.

클라이언트는 HTML 문서를 우선 받고 필요한 이미지 파일은 다시 웹 서버로 요청하여 이미지 파일을 받는 것이다.

그렇기 때문에 WAS(Web Application Server)까지 가지않고 웹 서버에서 바로 보내주는 것이 더 빠르기 때문에 웹 서버가 정적 컨텐츠만 처리하도록 기능이 분리되어 있는 것이고 이렇게 되면 서버의 부담을 줄일 수 있다.

__📌 WAS가 필요한 이유는?__

웹 서버는 정적인 컨텐츠만 제공할 수 있기 때문에 __동적인 컨텐츠__ 를 제공할 수 있는 WAS가 필요하다. 

동적인 컨텐츠는 요청에 맞는 DB 데이터를 가져와 비즈니스 로직에 맞게 결과는 만들어 제공함으로 자원을 효율적으로 사용할 수 있다.

__📌 WAS가 정적, 동적 컨텐츠 처리 모두 가능한데 WAS만 사용하면 되지 않을까?__

결과적으로 얘기하자면 __서버 부하 방지__ 를 위해 기능을 분리한 것이다.

WAS는 DB조회와 다양한 로직을 처리하느라 정신없는데 정적 컨텐츠도 처리하느라 업무를 과중하면 서버 부하가 커지게 되고 동적 컨텐츠 처리가 지연될 것이다.

<br>

## 🔖 참고
[https://codechasseur.tistory.com/25](https://codechasseur.tistory.com/25)

[https://gmlwjd9405.github.io/2018/10/27/webserver-vs-was.html](https://gmlwjd9405.github.io/2018/10/27/webserver-vs-was.html)

[https://velog.io/@denhur62/nginx-%EC%99%80-uwsgi%EB%A5%BC-%EC%99%9C-%EC%82%AC%EC%9A%A9%ED%95%A0%EA%B9%8C](https://velog.io/@denhur62/nginx-%EC%99%80-uwsgi%EB%A5%BC-%EC%99%9C-%EC%82%AC%EC%9A%A9%ED%95%A0%EA%B9%8C)

[https://www.youtube.com/watch?v=NyhbNtOq0Bc&t=236s](https://www.youtube.com/watch?v=NyhbNtOq0Bc&t=236s)


