function dataReceive() {
    fetch('/api/adminData')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.getElementById("adminName").innerText = `Imie: ${data.name}`;
            document.getElementById("adminSurname").innerText = `Nazwisko: ${data.surname}`;
            document.getElementById("adminLogin").innerText = `Login: ${data.login}`;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
window.onload = dataReceive;