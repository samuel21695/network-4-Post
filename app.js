const http = require('http');
const querystring = require('querystring');
const fs = require('fs');

http.createServer((req, res) => {

  if (req.method === 'GET' && req.url === '/') {
    fs.readFile( 'node-form.html', 'utf-8', (err, data) => {
      if (err) {
        serverErrorLog();
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    })
  }

  if (req.method === 'POST' && req.url === '/login') {
    // HTML 폼 태그 작성 부분에서 method = "POST"로 지정하는 것으로 변경
    let body = '';
    // 몸통이라는 임의의 변수에 담는다. 'POST' 요청은 본문이라는 것이 존재하기 때문에
    // body 라는 변수에 데이터를 '담아둔다' 라고 표현한다.
    // 해당 body 변수는 'POST' 요청이 들어올때마다 초기화 된다.
    // 따라서 if() 안에서만 사용할 수 있다.
    // if() 기준 body 변수는 지역변수이다.

    req.on('data', (chunk) => {
      body += chunk.toString(); // 데이터를 문자열로 변환
      // body = body + chunk.toString();
      // toString()을 사용하지 않으면,
      // 버퍼(buffer) 데이터를 문자열로 변환하지 ㅏㅇㄶ고 그대로 둔다.
    });

    req.on('end', () => {
      const parsedBody = querystring.parse(body); // 요청 본문을 파싱
      const { username, password } = parsedBody;

      console.log(`form 입력으로부터 받은 데이터 확인 -> `, parsedBody);
      console.log(`form 입력으로부터 받은 데이터 확인 -> `, username);
      console.log(`form 입력으로부터 받은 데이터 확인 -> `, password);

      res.writeHead(200, {'Contect-Type': 'text/plain'});
      res.end("login success!");
    });
  }

}).listen(3000, () => {
  console.log(`cli 창에서 컨트롤 누른 후 옆에 포트 누르면 편리하게 확인 -> http://localhost:3000/`)
});