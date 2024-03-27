import Urls from "../Consts/Urls";
export default class Connector {

    static GetRequest(token, url){
        const options = {
            method: "GET",
            headers:{
                Authorization: 'Bearer ' + token,
            },
        }
        return fetch(url, options);
    }

    static PatchRequest(token, url, body, isBodyFile=false){
        
        let headers={
            Authorization: 'Bearer ' + token,
        }
        let payload;
        if(isBodyFile){
            payload = body
        }
        else{
            headers['Content-Type'] = 'application/json'
            payload = JSON.stringify(body)
        }
        
        const options = {
            method: "PATCH",
            headers: headers,
            body: payload
        }
        return fetch(url, options);
    }
    static PostRequest(token, url, body){

    }
    static PutRequest(token, url, body){
        const options = {
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(body)
        }
        return fetch(url, options)
    }
    static DeleteRequest(token, url){
        const options = {
            method: "DELETE",
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
        return fetch(url, options);
    }

    static  Logout(){
        const options = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return fetch(Urls.Back + "/Account/Logout", options)
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
    static async CheckSession(){
        const options = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            }
        }
        return fetch(Urls.Back + "/Account/Refresh", options)
    }
}