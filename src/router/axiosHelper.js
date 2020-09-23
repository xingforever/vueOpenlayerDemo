import axios from 'axios'

axios.defaults.timeout=30000

var axiosHelper={
 
    requestByGet(url){
        let data={}
        axios.get(url,{responseType: 'jsonp'}).
        then (function (res) {           
            data = res;
        })
        console.log(data)
        return data;
       
    }
 
}

export default axiosHelper