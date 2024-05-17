
async function signUp(name, email, password, confirmPassword) {
    try {
        if (password !== confirmPassword) {
            throw new Error('As senhas não coincidem.');
        }

        const response = await fetch('https://api-umfg-programacao-iv-2024-291d5e9a4ec4.herokuapp.com/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error('Falha ao cadastrar. Verifique seus dados.');
        }

        return response.json(); 
    } catch (error) {
        throw error; 
    }
}


document.querySelector("#register").addEventListener("submit", async function(event) {
    event.preventDefault();
    var name = document.querySelector("#name").value;
    var email = document.querySelector("#emailSignUp").value;
    var password = document.querySelector("#passwordSignUp").value;
    var confirmPassword = document.querySelector("#confirmPassword").value;

    try {
        await signUp(name, email, password, confirmPassword);
        alert("Cadastro realizado com sucesso!");
       
    } catch (error) {
        alert(error.message);
    }
});


function showWelcomeScreen() {
    document.querySelectorAll('.content').forEach(function(element) {
        element.style.display = 'none';
    });
    document.querySelector('.welcome-content').style.display = 'block';
}

document.querySelector("#access").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.querySelector("#emailLogin").value;
    var password = document.querySelector("#passwordLogin").value;

    login(email, password)
        .then(response => {
            alert("Login bem-sucedido.");
            showWelcomeScreen();
        })
        .catch(error => {
            alert(error.message);
        });
});


function login(email, password) {
    return fetch('https://api-umfg-programacao-iv-2024-291d5e9a4ec4.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Login falhou. Verifique suas credenciais.');
            }
        });
}
