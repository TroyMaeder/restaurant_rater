document.getElementById('user_input').addEventListener('keyup', function() {
  const xhr = new XMLHttpRequest();
  const input = document.getElementById('user_input').value;
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const arr = JSON.parse(xhr.response);
      console.log(arr, '000000');
      for (let i = 0; i < arr.length; i++) {
        const link = `<a href="/review/${arr[i]._id}/${arr[i].restaurant.name}">${arr[i].restaurant.name}</a>`;
        document.getElementById(`restaurant${i}`).innerHTML = link;
      }
    }
  };
  if (input) {
    for (let i = 0; i < 3; i++) {
      document.getElementById(`restaurant${i}`).value = '';
      xhr.open('GET', `/search/${input}`, true);
      // xhr.open('GET', '/search-service?q=' + input, true);
      xhr.send();
    }
  }
});
