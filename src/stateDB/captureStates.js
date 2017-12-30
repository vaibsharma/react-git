/**
 * Class for playing with the UI States
 * Thanks @facebook and component design of the JS UI
 * @author - vaibhav sharma (github.com/vaibsharma)
 * @contact - vaib.sharma44@gmail.com
 */

import PouchDB from 'pouchdb';
import $ from 'jquery';
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
        this.saveCurrentState = this.saveCurrentState.bind(this);
        this.getCurrentKey = this.getCurrentKey.bind(this);
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

    getPreviousState(){
        console.log('the pouch db instance',this.pouchDB);
    }

    getNextState(){
        console.log('the pouch db instance',this.pouchDB);
    }

    saveCurrentState(userID){
        return new Promise((resolve,reject)=>{
            let host= "http://localhost:5984/busigence/"+userID;
            console.log(host);
            var response = $.ajax({
                type:'GET',
                url:host,
                dataType:'text',
                success:function(data){
                    //console.log(data);
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

    getCurrentKey(){
        return "vaibhavid";
    }

}
