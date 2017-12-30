import React from 'react'
import { Grid, Image, Button, Checkbox } from 'semantic-ui-react'
import Writing from "../Form/Form"
import ListElement from "../List/List"
import StateOptions from "../Options/Options"
/* const styles = {
 *     body: {
 *         height:'100vh',
 *     },
 *     messenger:{
 *     },
 *     google:{
 *         backgroundColor:'#3949ab'
 *     }
 * },
 *       messenger = Object.assign({}, styles.body, styles.messenger),
 *       google = Object.assign({}, styles.body, styles.google);
 * 
 * export default Main*/


export default class Main extends React.Component {

    constructor(props){
        //console.log(props);
        super(props);
        console.log(props.data);
        this.onUpdate = this.onUpdate.bind(this);
        const newData = {Writing:{},StateOptions:{}}
        this.state = {
            writing:"",
            data: props.data || newData
        }
        /* this.setState({data:newData});*/
    }

    onUpdate(child,data){
        console.log(`I am here inside Main and I am the father of ${child}`);
        console.log(`new data from ${child} is `,data);
        let newData = this.state.data;
        newData[child] = data;
        this.props.onUpdate(this.props.id,newData);
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>
                <Writing id="Writing" style={styles.ListElement} data={this.state.data.Writing} onUpdate={this.onUpdate}/>
                <StateOptions data={this.state.data.StateOptions} id="StateOptions" onUpdate={this.onUpdate}/>
            </div>
        )
    }
}

const styles = {
    ListElement:{
        marginBottom:"10%"
    }
}
