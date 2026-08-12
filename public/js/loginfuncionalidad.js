document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('campoCorreo').value;
    const password = document.getElementById('campoPassword').value;
    const isAdmin = document.getElementById('adminCheck').checked;
    let tabla = '';
    let campoCorreoBD = '';
    if (isAdmin) {
        tabla = 'administradores'
        campoCorreoBD = 'correo_adm'
    } else {
        tabla = 'usuarios'
        campoCorreoBD = 'correo_user'
    }
    //const tabla = isAdmin ? 'administradores' : 'usuarios';
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            tabla: tabla,
            campoCorreoBD: campoCorreoBD
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/home';
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error en la solicitud');
        });
});