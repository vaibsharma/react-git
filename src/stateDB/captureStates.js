/**
 * Class for playing with the UI States
 * Thanks @facebook and component design of the JS UI
 * @author - vaibhav sharma (github.com/vaibsharma)
 * @contact - vaib.sharma44@gmail.com
 */

import PouchDB from 'pouchdb';
import $ from 'jquery';
import shortid from 'shortid';
/**
 *  Data Structure for storing previous states
 */
// new data = {
//     _id: "parentID",
//     _rev:"random id",
//     type:"parent/child",
//     parentId:{
//         exist:true,
//         key: "parentKey"
//     },
//     previous:{
//         exist:true,
//         key: "previousKey"
//     },
//     next:{
//         exist:true,
//         key: "nextKey"
//     },
//     data:{
//     },
//     time:""
// };

export default class States{

    /**
     * Constructor for State class
     * @function getPreviousState
     * @function getPreviousState
     * @function getNextState
     * @function saveCurrentState
     * @class pouchDB
     */

    constructor(){
        this.getParentState = this.getParentState.bind(this);
        this.getPreviousState = this.getPreviousState.bind(this);
        this.getNextState = this.getNextState.bind(this);
        this.getCurrentState = this.getCurrentState.bind(this);
        this.saveCurrentState = this.saveCurrentState.bind(this);
        this.pouchDB = new PouchDB("http://localhost:5984/busigence", {
            ajax: {
                cache: false,
                timeout: 10000,
                headers: {
                    'Content-Type':'application/json'
                }
            },
            auth: {
                username: 'admin',
                password: '123456789'
            }
        });
    }

    // getParentState(userID){
    //     this.pouchDB.get(userID).then((data) => {
    //         console.log(data);
    //     }).;
    //}

    getParentState(){
        console.log('the pouch db instance',this.pouchDB);
    }

    saveCurrentState(userId,data){
        var dateTime = new Date;
        return new Promise((resolve,reject)=>{
            this.getCurrentState(userId).then((result)=> {
                console.log(result);
                let newUserId = (shortid.generate() + dateTime.getTime());
                var obj = {
                    type:'children',
                    parentId: {
                        exist:false,
                        key:""
                    },
                    previous:{
                        exist:true,
                        key:result._id
                    },
                    next:{
                        exist:false,
                        key:""
                    },
                    data:data,
                    timeUpdate:dateTime.getTime()
                };
                var host = "http://vaibhav:1234567890@localhost:5984/busigence/"+newUserId;
                var response = $.ajax({
                    type:'PUT',
                    url:host,
                    dataType:'text',
                    data:JSON.stringify(obj),
                    success:function(data){
                        //console.log(data);
                        data = JSON.parse(data);
                        var output = {
                            newData:data,
                            previousData:result
                        };
                        resolve(output);
                    },
                    error:function(err){
                        reject(err);
                    }
                });
                //resolve(result._id);
            }).catch((err)=>{
                console.log(err);
                reject(err);
            });
        });
    }

    getPreviousState(){
        console.log('the pouch db instance',this.pouchDB);
    }

    getNextState(){
        console.log('the pouch db instance',this.pouchDB);
    }

    getCurrentState(userID){
        return new Promise((resolve,reject)=>{
            let host= "http://localhost:5984/busigence/"+userID;
            console.log(host);
            var response = $.ajax({
                type:'GET',
                url:host,
                dataType:'text',
                success:function(data){
                    //console.log(data);
                    data = JSON.parse(data);
                    resolve(data);
                },
                error:function(err){
                    reject(err);
                }
            });
        });
        // request(host,function(error,response,body){
        //     console.log('error',error);
        //     console.log('statusCode',response && response.statusCode);
        //     console.log('body',body);
            
        // });
        // console.log('the pouch db instance',this.pouchDB);
    }
}
