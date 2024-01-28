import Urls from "../Consts/Urls";
export default class Connector {


    static async Save(path, dto){
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                Name: name,
                Surname: surname,
                Email: email,
                Password: password
            })
        }
    }

    static async Register(name, surname, email, password) {

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
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
            mode: 'cors',
            credentials: 'include',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                Email: email,
                Password: password
            }) 
        }

        let response
        let token
        await fetch(Urls.Back + '/Account/Login', options)
                                .then(res => {
                                    console.log(res)
                                    response = res;
                                    return res.text()
                                })
                                .then(data => token = data);

        if(response.ok){
            return token
        }
        else{
            return false
        }
    }
    static async RefreshToken(){
        const options ={
            method: 'POST',
            mode: 'cors',
            headers:{'Content-Type': 'application/json'},
        }
        let response
        let token
        await fetch(Urls.Back + '/Account/Refresh', options)
                                .then(res => {
                                    console.log(res)
                                    response = res;
                                    return res.text()
                                })
                                .then(data => token = data);
        
        
    }
}