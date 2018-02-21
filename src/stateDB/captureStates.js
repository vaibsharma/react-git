/**
 * Class for playing with the UI States
 * Thanks @facebook and component design of the JS UI
 * @author - vaibhav sharma (github.com/vaibsharma)
 * @mail - vaib.sharma44@gmail.com
 */

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
        this.getDocuments = this.getDocuments.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
        this.saveCurrentState = this.saveCurrentState.bind(this);
        this.getNewVersion = this.getNewVersion.bind(this);
        this.host = "http://vaibhav:1234567890@localhost:5984/git-react/";
    }

    /**
     * Initializer function for the states
     * @param _username {string}_
     * @param stateData {object}
     * @return Promise
     */

    __init__(_username_,stateData){
        return new Promise((resolve,reject)=>{
            this.getDocuments(_username_).then((documents)=>{
                var obj = {
                    versions:[],
                    data:{
                    }
                }, versions = [], id = "";

                // If there is no document for the user i.e. user coming for the first time

                if(documents.length == 0){
                    // Adding new user to database
                    this.getNewVersion(_username_,stateData).then((result)=>{
                        console.log(result);
                        versions = [result.id];
                        obj.versions = versions;
                        id = this.host + result.id;
                        ajax.makeGET(id).then((result)=>{
                            obj.data = result;
                            resolve(obj);
                        }).catch((err)=>{
                            reject(err);
                        });
                    }).catch((err)=>{
                        reject(err);
                    });
                }

                // They are versions. Currently we are not using them, nevertheless functionality is just one 10 lines function less.

                else if(documents.length>0){
                    for(var x in documents){
                        versions.push(documents[x]._id);
                    }
                    console.log(versions);
                    obj.versions = versions;
                    var host = this.host + versions[0];
                    ajax.makeGET(host).then((result)=>{
                        host = this.host + result.head;
                        ajax.makeGET(host).then((headResult)=>{
                            obj.data = headResult;
                            resolve(obj);
                        }).catch((err)=>{
                            obj.data = result;
                            resolve(obj);
                        });
                    }).catch((err)=>{
                        reject(err);
                    });
                }
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    /**
     * Finding the Parent(branch) documents for a user
     * @param _username_ {string}
     * @return Promise
     */

    getDocuments(_username_){
        let host = this.host + "_find", query = this.makeDocumentQuery(_username_);
        return new Promise((resolve,reject)=>{
            console.log(query);
            ajax.makePOST(query,host).then((result)=>{
                resolve(result.docs);
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    /**
     * Function to handle operation on states i.e. Previous, Next and Save
     * @param handler {string}
     * @param stateData
     * @return Promise
     */

    stateHandler(handler,stateData){
        console.log(handler,stateData);
        return new Promise((resolve,reject)=>{

            // Handling save operation.

            if(handler == 'save'){
                console.log("asking for save");
                this.saveCurrentState(stateData).then((result)=>{
                    this.handleParent(stateData.parent, result.id).then((firstpass)=>{
                        console.log("parent is handled");
                        this.handlePrevious(stateData.stateid, result.id).then((secondpass)=>{
                            console.log("previous element is handled");
                            if(stateData.next.length>0) this.deleteNextStates(stateData.next).then((result)=>{
                                console.log(result);
                            }).catch((err)=>{
                                reject(err);
                            });
                        }).catch((err)=>{
                            console.error(err,"previous element is not handled");
                        });
                    }).catch((err)=>{
                        console.error("parent is not handled");
                    });

                    var obj = {
                        versions:[],
                        data:{}
                    };

                    var host = this.host + result.id;
                    ajax.makeGET(host).then((fullDocument)=>{
                        obj.versions = stateData.versions;
                        obj.data = fullDocument;
                        resolve(obj);
                    }).catch((err)=>{
                        reject(err);
                    });
                }).catch((err)=>{
                    resolve(err);
                });
            }

            // Handling previous and next operation.

            else if(handler == 'previous' || handler == 'next'){
                console.log(`asking for ${handler}`);
                let pointer = stateData[handler];
                if(pointer.length>0){
                    let host = this.host + pointer;
                    ajax.makeGET(host).then((result)=>{
                        let obj = {
                            versions:[],
                            data:{}
                        };
                        obj.versions = stateData.versions;
                        obj.data = result;
                        resolve(obj);
                    }).catch((err)=>{
                        reject(err);
                    });
                }
                else{
                    let err = `You requested for ${handler} but we didn't find any such ${handler} state from the current state`;
                    reject(err);
                }
            }
        });
    }

    /**
     * Function to delete all documents after the current state
     * @param nextId {string}
     * @return Promise
     */

    deleteNextStates(nextId){
        return new Promise((resolve,reject)=>{
            let host = this.host + nextId;
            ajax.makeGET(host).then((result)=>{
                if(result.next.exist){
                    this.deleteNextStates(result.next.pointer).then((success)=>{
                        console.log(success);

                    }).catch((err)=>{
                        console.error(err);
                    });
                };
                ajax.makeDELETE(nextId).then((result)=>{
                    resolve(result);
                }).catch((error)=>{
                    reject(error);
                });
            });
        });
    }

    /**
     * Function to handle the Parent document to point to current head document
     * @param parentId {string}
     * @param headId {string}
     * @return Promise
     */

    handleParent(parentId,headId){
        return new Promise((resolve,reject)=>{
            let host = this.host + parentId;
            ajax.makeGET(host).then((parentDocument)=>{
                var obj = parentDocument;
                obj.head = headId;
                ajax.makePUT(obj,host).then((result)=>{
                    resolve(result);
                }).catch((err)=>{
                    reject(err);
                });
            }).catch((err)=>{
                var err = "Cannot update the parent Document of this branch";
                reject(err);
            });
        });
    }

    /**
     * Function to handle the parent document to point to current head document
     * @param previousId {string}
     * @param headId {string}
     * @return Promise
     */

    handlePrevious(previousId, headId){
        return new Promise((resolve,reject)=>{
            let host = this.host + previousId;
            ajax.makeGET(host).then((parentDocument)=>{
                var obj = parentDocument;
                obj.next.exist = true;
                obj.next.pointer = headId;
                ajax.makePUT(obj,host).then((result)=>{
                    resolve(result);
                }).catch((err)=>{
                    reject(err);
                });
            }).catch((err)=>{
                var err = "Cannot update the parent Document of this branch";
                reject(err);
            });
        });
    }

    /**
     * Function to save current document
     * @param stateData {object}
     * @return Promise
     */

    saveCurrentState(stateData){
        return new Promise((resolve,reject)=>{
            let date = new Date, id = date.getTime()+shortid.generate();
            var obj = {
                data:stateData.data,
                username:stateData.username,
                type:"children",
                next:{
                    exist:false,
                    pointer:""
                },
                previous:{
                    exist:true,
                    pointer:stateData.stateid
                },
                parentId:stateData.parent,
                head:id,
                timeupdate:date.toString()
            };
            let host = this.host + id;
            ajax.makePUT(obj,host).then((result)=>{
                resolve(result);
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    /**
     * Function to get new version
     * @param username {string}
     * @param stateData {object}
     * @return Promise
     */

    getNewVersion(username,stateData){
        let date = new Date, time = date.getTime(), id = time + shortid.generate();
        let stateDocument = {
            type:"parent",
            parentId:id,
            username:username,
            head:id,
            next:{
                exist:false,
                pointer:""
            },
            previous:{
                exist:false,
                pointer:""
            },
            data:stateData,
            timeupdate:date.toString()
        };

        let host = this.host + id;
        return new Promise((resolve,reject)=>{
            ajax.makePUT(stateDocument,host).then((result)=>{
                resolve(result);
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    /**
     * Function to make a couchDB query
     * @param username {string}
     * @return Promise
     */

    makeDocumentQuery(username){
        let query = {
            "selector": {
                "$and": [
                    {
                        "username": username
                    },
                    {
                        "type": "parent"
                    }
                ]
            },
            "sort": [
                {
                    "timeupdate": "desc"
                }
            ]
        };
        return query;
    }
}
