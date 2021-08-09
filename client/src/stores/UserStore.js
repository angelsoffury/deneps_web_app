import {extendObservable} from 'mobx';

/*
* User Store
*/

class UserStore {
    constructor()
    {
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            isValidUser:false,
            firstName: '',
            lastName: '',
            userEmail: ''
        })
    }
}

export default new  UserStore();