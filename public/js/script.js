document.getElementById('user_input').addEventListener('keyup', function() {
  const xhr = new XMLHttpRequest();
  const input = document.getElementById('user_input').value;
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log('asdf', xhr.response);
    }
  };
  xhr.open('GET', '/search/' + input, true);
  // xhr.open('GET', '/search-service?q=' + input, true);
  xhr.send();
});
