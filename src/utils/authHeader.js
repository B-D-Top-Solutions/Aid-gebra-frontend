import axios from 'axios'

// ***
// Token names :
//      admin
//      student
//      teachers
// ***

const auth = (tokenName) => {
    if (!tokenName) return
    const token = localStorage.getItem( tokenName+'-token')

    if(token){
        axios.defaults.headers = {
            token : localStorage.getItem( tokenName+'-token'),
            "Content-Type" : "Application/json"
        }
        console.log(axios.defaults.headers)
    }
    else{
        delete axios.defaults.headers
    }
    
}

export default auth