
let url="http://localhost:8000/employeelist"

var selectedRow = null;


function addEmployee(){
    let payload={};
    payload['firstname']=document.getElementById("firstname").value;
    payload['lastname']=document.getElementById("lastname").value;
    payload['id']=document.getElementById("id").value;

    fetch("http://localhost:8000/employeelist",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
    })
    .then((res)=>res.json())
    .then((response)=>{
        document.getElementById("message").innerHTML=response.message;
        document.getElementById("firstname").value="";
        document.getElementById("lastname").value="";
        document.getElementById("id").value="";
        getData();
    })
    
}




function getData(){
    fetch("http://localhost:8000/employeelist")
    .then((res)=>res.json())
    .then((response)=>{
        var data="";
        console.log(response);
        response.forEach((employee,index)=>{
            data+="<tr>";
            data+="<td>"+employee.firstname+"</td>";
            data+="<td>"+employee.lastname+"</td>";
            data+="<td>"+employee.id+"</td>";
            data+="<td><button class='btn btn-primary' onClick='editDataCall()'>Edit</button></td>";
            data+="<td><button class='btn btn-danger''onclick='onDelete('this')'>Delete</button></td>";
            data+="</tr>";

        })
        document.getElementById("tbData").innerHTML=data;
    })
}
getData();



function resetForm() {
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("id").value = "";
    
    selectedRow = null;
}
        
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
