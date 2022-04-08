
<html>
<head>
<title>메인 페이지</title>
<link rel="stylesheet" href="/css/index.css"/>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
</head>
<body>
<input id="test" value="test"/>
<div
    class="main_title">
    id를 입력하시오.
</div>
<button
    onclick="calCulator()">
    로그인
</button>

</body>

<script>
    const url = 'http://127.0.0.1:15555/api/member/list';

    let number = "1234";


    function calCulator () {
    console.log($("#test").val());
    return;
}
</script>

</html>