import Urls from "../Consts/Urls";
export default class Connector {
    static async Register(name, surname, email, password) {

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Name: name,
                Surname: surname,
                Email: email,
                Password: password
            })
        }

        let res
        await fetch(Urls.Back + '/Account/Register', options)
            .then(res => {
                return res
            })
            .then(data => res = data);

            return true;
    }
    static async Login (email, password){
        const options ={
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                Email: email,
                Password: password
            }) 
        }
        let response= await fetch(Urls.Back + '/Account/Login', options)
        
        console.log(response);
        //.then(data => response = data);
        return true
    }
}