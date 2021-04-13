import axios from 'axios'

const instance=axios.create({
  
    baseURL:'http://localhost:5001/clone-5d82c/us-central1/api'//THE Api {cloud} function URL
})

export default instance;
//http://localhost:5001/clone-5d82c/us-central1/api
//http://localhost:5001/clone-5d82c/us-central1/api/payments/create?total=2999