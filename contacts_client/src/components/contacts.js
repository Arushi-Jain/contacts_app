import React from 'react';
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from "@material-ui/core/CircularProgress"
import Paper from "@material-ui/core/Paper"

import * as apiutils from "../utils/apiutils"
import * as utils from "../utils/utils"


class Contacts extends React.Component {
    constructor() {
        super()
        this.state = {
            data:[],
            totalData:0,
            loading: false
        }

       this.getContacts = this.getContacts.bind(this);
       // this.handleLoginFailure = this.handleLoginFailure.bind(this);
    }
    componentWillMount(){
        this.getContacts()
    }
    async getContacts() {
           try{
            this.setState({ loading: true})   
            const obj = utils.getResponseObj()
            let res = await apiutils.getContacts(obj)
            console.log(res)
            let data = []
            res.data.map((item)=>{
                data.push({
                    name: item.displayName? item.displayName: "-",
                    email: item.emailAddresses? item.emailAddresses : "-", 
                    phone: item.phoneNumber ? item.phoneNumber.value: "-", 
                    image: item.photo ? item.photo : "-"
                })
            })  

            this.setState({ data, totalData: res.totalPeople, loading: false })
           }catch(e){
             console.log(e)
             this.setState({loading: false})
             alert("Failed to fetch contacts")
           }
    }  
    render(){
        let columns= [
            { title: '', field: 'image', type: 'image' },
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' },
            { title: 'Phone Number', field: 'phone', type: 'numeric' },
        ]
        const { data, totalData,loading } = this.state
        return (
            <React.Fragment>
             <div className="contact">   
             {loading ?
                <div className="progressWrap absolute">
                    <CircularProgress className="progress" color="primary" size={50} />
                </div> :
            <Paper>
                <Table className="table">
                    <TableHead>
                        total: {totalData}
                        <TableRow>
                            {columns.map((column, index) => {
                                return (
                                    <TableCell
                                        key={index} >
                                        <b>{column.title}</b>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((rowData, rowIndex) => (
                            <TableRow
                                key={rowIndex}>
                                {columns.map((column, index) => {
                                    return (
                                        <TableCell key={index}>
                                           {column.type==="image"? 
                                               <Avatar alt="No Image" src={rowData[column.field]}/>:
                                              rowData[column.field]}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper> }
            </div>
         </React.Fragment>
        )
    }
}

export default Contacts;
