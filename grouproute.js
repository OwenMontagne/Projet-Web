document.getElementById('group-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const grp_name = document.getElementById('grp_name').value;
  fetch('/group', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ grp_name }),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));
});

document.getElementById('user-group-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const user_id = document.getElementById('user_id').value;
  const grp_id = document.getElementById('grp_id').value;
  fetch('/user-group', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, grp_id }),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));
});
