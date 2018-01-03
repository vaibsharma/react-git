/**
 * Class for playing with the UI States
 * Thanks @facebook and component design of the JS UI
 * @author - vaibhav sharma (github.com/vaibsharma)
 * @contact - vaib.sharma44@gmail.com
 */

import $ from 'jquery';
import shortid from 'shortid';
import Ajax from '../helpers/ajax';

const ajax = new Ajax;

export default class States{

    /**
     * Constructor for State class
     * @function getPreviousState
     * @function getPreviousState
     * @function getNextState
     * @function saveCurrentState
     * @function helpParent
     */

    constructor(){
        this.getParentState = this.getParentState.bind(this);
        this.getPreviousState = this.getPreviousState.bind(this);
        this.getNextState = this.getNextState.bind(this);
        this.getCurrentState = this.getCurrentState.bind(this);
        this.saveCurrentState = this.saveCurrentState.bind(this);
        this.helpParent = this.helpParent.bind(this);
    }

    /**
     * Function for updating the userObject
     * to where its currently pointing
     * @param {string} newUserId                   // hashed userId
     */

    helpParent(newUserId){
        var userId = 'vaibhavid';  //username
        this.getCurrentState(userId).then((result)=>{
            var data = {
                _rev:result._rev,
                type:result.type,
                data:result.data,
                parentId:{
                    exist:true,
                    key:newUserId
                },
                next:result.next,
                previous:result.previous,
                timeUpdate:result.timeUpdate
            };
            var host = "http://vaibhav:1234567890@localhost:5984/busigence/" + userId;
            ajax.makePUT(data,host).then((result)=>{
                console.log("promises are working");
                console.log(result);
            }).catch((error)=>{
                console.error(error);
            });
        });
    }

    /**
     * Function for the topmost state
     * i.e. get me the totally initial state in one go
     */

    getParentState(){
        console.log('the pouch db instance',this.pouchDB);
    }

    /**
     * Function for saving the current changed state
     * by the user
     * @param {string,data} userId,data
     * @return Promise, resolve on data, reject on error in ajax
     */

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
                ajax.makePUT(obj,host).then((newData)=>{
                    var output = {
                        newData:newData,
                        previousData:result
                    };
                    console.log("The promise is working",output);
                    resolve(output);
                }).catch((error)=>{
                    reject(error);
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

    /**
     * Function for getting the current state
     * @param {string} userId
     * @return Promise, resolve on data, reject on error, in ajax
     */

    getCurrentState(userID){
        return new Promise((resolve,reject)=>{
            let host= "http://localhost:5984/busigence/"+userID;
            console.log(host);
            ajax.makeGET(host).then((data)=>{
                console.log('no parent ID');
                resolve(data);
            }).catch((error)=>{
                reject(error);
            });
        });
    }
}
