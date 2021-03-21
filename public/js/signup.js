const signUp = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    const name = document.querySelector('#uName-signup').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ email, password, name }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to log in');
          }
}}

document.querySelector('.signup-form').addEventListener('submit', signUp);