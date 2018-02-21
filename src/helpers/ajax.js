/**
 * @author - vaibhav sharma (github.com/vaibsharma)
 * @contact - vaib.sharma44@gmail.com
 */

import $ from 'jquery';

/**
 * Class for making ajax calls
 * by binding them with the promises
 */

export default class Ajax{

    /**
     * @constructor for binding the function with 'this'
     * @function makePOST
     * @function makePUT
     * @function makeGET
     * @function makeAJAX
     */

    constructor(){
        this.makePOST = this.makePOST.bind(this);
        this.makePUT = this.makePUT.bind(this);
        this.makeGET = this.makeGET.bind(this);
        this.makeAJAX = this.makeAJAX.bind(this);
    }

    /**
     * Function for making AJAX requests
     * @param {object,string,string} data, requestType, host
     * @return Promise resolve on data, reject on error
     */

    makeAJAX = (data,requestType,host)=>{
        return new Promise((resolve,reject)=>{
            try{
                var response = $.ajax({
                    type:requestType,
                    url:host,
                    dataType:'text',
                    data:JSON.stringify(data),
                    contentType:"application/json",
                    success:function(result){
                        //console.log(data);
                        result = JSON.parse(result);
                        resolve(result);
                        //console.log(data);
                    },
                    error:function(error){
                        reject(error);
                    }
                });
            }
            catch(error){
                reject(error);
            }
        });
    };

    /**
     * Function for making POST request
     * @param {object,string} data, host
     * @return Promise resolve on data, reject on error
     */

    makePOST = (data,host)=>{
        var requestType = 'POST';
        return new Promise((resolve,reject)=>{
            this.makeAJAX(data,requestType,host).then((result)=>{
                resolve(result);
            }).catch((error)=>{
                reject(error);
            });
        });
    };

    /**
     * Function for making PUT request
     * @param {object,string} data, host
     * @return Promise resolve on data, reject on error
     */

    makePUT = (data,host)=>{
        var requestType = 'PUT';
        return new Promise((resolve,reject)=>{
            this.makeAJAX(data,requestType,host).then((result)=>{
                resolve(result);
            }).catch((error)=>{
                reject(error);
            });
        });
    };

    /**
     * Function for making GET request
     * @param {string}
     * @return Promise resolve on data, reject on error
     */

     makeGET = (host)=>{
        var requestType = 'GET', data = {};
        return new Promise((resolve,reject)=>{
            this.makeAJAX(data,requestType,host).then((result)=>{
                resolve(result);
            }).catch((error)=>{
                reject(error);
            });
        });
     };

    makeDELETE = (host)=>{
        var requestType = 'DELET', data = {};
        return new Promise((resolve,reject)=>{
            resolve("okkay I am done");
            reject("fuck off");
        });
    };
}
