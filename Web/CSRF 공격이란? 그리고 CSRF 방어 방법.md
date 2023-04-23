## 📌 CSRF 공격이란
웹 어플리케이션 취약점 중 하나로 인터넷 사용자가 자신의 의지와는 다르게 공격자가 의도한 수정, 삭제, 등록 등의 행위를 사용자가 사용하는 웹 사이트에 요청하게 만드는 공격이다.

### ➤ CSRF 공격을 하는 이유
해커는 희생자의 권한을 도용하여 중요 기능을 작동하는 것이 가능해진다. 예를 들어 특정 사용자의 계정을 도용함으로써 해당 계정에 의도하지 않은 광고성 글을 무작위로 게시하는 것이 가능하다.

물론 이 CSRF는 해커가 사용자의 컴퓨터를 감염하고 서버를 해킹하여 이루어 지는 공격은 아니다. 그렇기 때문에 사전에 조건이 충족되어야 한다.
1. 위조 요청을 정송하는 서비스에 사용자가 로그인 상태여야한다.
2. 사용자가 해커가 만든 피싱 사이트에 접속해야한다.

위의 조건을 만족하면 사용자는 간단하게 사용자의 권한을 도용당하는 일이 발생할 것이다.

예를들어 우리가 자주 사용하는 네이버, 구글 등의 사이트는 자동 로그인을 해놓은 경우가 많고 피싱 사이트는 피싱 메일, 음란 사이트 등을 통해 접속 될 수 있다. 사용자가 해커가 만든 피싱 사이트를 하지 않더라도 해커가 XSS 공격을 성공한 정상 사이트를 통해 CSRF공격이 수행될 수도 있다.

### ➤ CSRF 공격코드 살펴보기
좀 더 이해하기 쉽게 예제 CSRF 공격코드를 살펴보려고 한다. 

네이버 블로그나 티스토리 등의 글을 작성할 때, 아래와 같은 코드와 폼이 전송된다고 예를 들자. 피싱사이트에 똑같이 글쓰기를 요청하는 폼이 숨겨져 있고, 그 내용으로 가입하면 10만원을 준다는 사기성 광고를 본문으로 적혀져있다. 사용자는 피싱 사이트에 접속함으로써 본인의 네이버나 니스토리 계정으로 해당 글이 등록되게 된다.


__피싱 사이트에 포함된 코드__
```html
<form action="http://naver.com/api/content" method="post">
    <input type="hidden" name="body" value="여기 가입하면 돈 10만원 드립니다." />
    <input type="submit" value="Click Me"/>
</form>
```

위의 공격을 통해 사용자는 이웃이나, 알림을 설정해놓은 다른 사용자에서 의도하진 광고나 사기를 전달하는 일이 발생할 수 있다.

<br>

## 📌 방어 기법
1. Referrer 검증
2. Security Token 사용

일반적으로 CSRF 공격 / 방어는 HTTP GET 요청 방식에는 방어 대상에 두지 않고, 쓰기/변경이 가능한 POST, PATCH, DELETE 방식에만 적용하면 된다. 물론 중요한 데이터를 조회하는 경우나 GET으로 쓰기/변경을 하는 경우에는 GET 방식에도 방어를 해야할 것이다.

### ➤ Referrer 검증
백엔드에서 request의 referrer를 확인하여 domain(ex. www.naver.com)이 일치하는 지 검증하는 방법이다. 일반적으로 Referrer 검증만으로 대부분의 CSRF 공격을 방어할 수 있다고 한다. 하지만 같은 도메인 내의 페이지에 XSS 취약점이 있는 경우 CSRF 공격에 취약해질 수 있다. domain단위 검증에서 좀 더 세밀하게 페이지 단위까지 일치하는지 검증을 하면 도메인 내의 타 페이지에서의 XSS 취약점에 의한 CSFR공격을 방어 할 수 있다.

### ➤ Security Token 사용(A.K.A CSRF Token)
Referrer검증이 불가한 환경이라면, Secruity Token을 사용할 수 있다. 

우선 사용자의 세션에 임의의 난수 값을 저장하고 사용자의 요청 마다 해당 난수 값을 포함 시켜 전송시킨다. 이후 백엔드 에서 요청이 들어올 때마다 세션에 저장된 토큰 값과 요청 파라미터에 전달되는 토큰 값이 일치하는 지 검증하는 방법이다.

하지만 이 방법도 같은 도메인 내에 XSS 취약점이 있다면 CSRF공격에 취약해진다.

```javascript
// 로그인시, 또는 작업화면 요청시 CSRF 토큰을 생성하여 세션에 저장한다.
session.setAttribute("CSRF_TOKEN",UUID.randomUUID().toString());

// 요청 페이지에 CSRF 토큰을 셋팅하여 전송한다
<input type="hidden" name="_csrf" value="${CSRF_TOKEN}" />

// 파라미터로 전달된 csrf 토큰 값
String param = request.getParameter("_csrf");

// 세션에 저장된 토큰 값과 일치 여부 검증
if (request.getSession().getAttribute("CSRF_TOKEN").equals(param)) {
    return true;
} else {
    response.sendRedirect("/");
    return false;
}
```

<br>

## 📌 참고
- [https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF))
- [https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet)
- [http://appsandsecurity.blogspot.kr/2012/01/stateless-csrf-protection.html](http://appsandsecurity.blogspot.kr/2012/01/stateless-csrf-protection.html)