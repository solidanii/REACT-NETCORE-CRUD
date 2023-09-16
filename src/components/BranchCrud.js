import axios from "axios";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function BranchCrud() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [branchid, setId] = useState("");
    const [branchName, setName] = useState("");
    const [location, setloc] = useState("");
    // const [regDate, setdate] = useState("");
    const [branches, setbranch] = useState([]);
     

    //for edit
    const [editid, seteditId] = useState("");
    const [editName, seteditName] = useState("");
    const [editloc, seteditloc] = useState("");
    // const [editbranches, seteditbranch] = useState([]);
  

      useEffect(() => {
        (async () => await Load())();
      }, []);
     
      async function Load() {
        
        const result = await axios.get("https://localhost:7146/api/branches/");
        setbranch(result.data);
        console.log(result.data);
      }
     
      async function save(event) {
       
        event.preventDefault();
        try {
          await axios.post("https://localhost:7146/api/branches", {
            
          branchName: branchName,
          location: location,
          // regDate: regDate,
           
          });
          alert("Branch Registation Successfully");
              setId("");
              setName("");
              setloc("");
              // setdate("");
           
         
          Load();
        } catch (err) {
          alert(err);
        }
      }
      // //populate
      // const editBranch = (id)  =>{
        async function editBranch(id){
      
        handleShow();
         axios.get("https://localhost:7146/api/branches/"+id)
          .then((result)=>{

            seteditName(result.data.branchName);
            seteditloc(result.data.location);
            seteditId(id);
   
          })
        .catch ((error) =>{
         console.log(error);
        })

      }
     
      async function DeleteBranch(branchid) {
      await axios.delete("https://localhost:7146/api/branches/" + branchid);
      if(window.confirm("Are you sure you want to delete this branch") == true)
      {
        alert("Branch with Id="+branchid+" deleted Successfully");
        setId("");
        setName("");
        setloc("");
       //  setdate("");
        Load();
      }
   
      }
     
      async function update() {
        
          const url = 'https://localhost:7146/api/branches/'+editid;
          const data = {
            "branchid": editid,
             "branchName": editName,
             "location": editloc,
          }
    
         axios.put(url, data)
            editBranch();
            alert("Branch updated Successfully");
            window.location.reload(); // Reload the page
       
      //   event.preventDefault();
      //   t
      // await axios.patch("https://localhost:7146/api/branches"+ branches.find((u) => u.editid === editid).editid || editid,
      //       {
      //         editid: editid,
      //         editName: editName,
      //         editloc: editloc,
      //       // regDate: regDate,
      //       }
      //     );
          
      //     alert("Registation Updated!!");
      //     editid("");
      //     editName("");
      //     editloc("");
      //     // setdate("");
      //     handleShow(editBranch);
        
      //   } catch (err) {
      //     alert(err);
      //   }
      }

    return (
      <div class="container">
      <div class="row justify-content-center">
        <h1>Branch Details</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
           
            <input
              type="text"
              class="form-control"
              id="branchid"
              hidden
              value={branchid}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Branch Name</label>
            <input
              type="text"
              class="form-control"
              id="branchName"
              value={branchName}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Location</label>
            <input
              type="text"
              class="form-control"
              id="location"
              value={location}
              onChange={(event) => {
                setloc(event.target.value);
              }}
            />
          </div>
          {/* <div class="form-group">
            <label>Register Date</label>
            <input
              type="text"
              class="form-control"
              id="regDate"
              value={regDate}
              onChange={(event) => {
                setloc(event.target.value);
              }}
            />
          </div> */}
          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
      
          </div>
        </form>
        <br></br>
      </div>
     
      <br></br>
      <table class="table table-striped table-bordered" align="center">
      <thead class="table-primary">
          <tr>
            <th scope="col">Branch Id</th>
            <th scope="col">Branch Name</th>
            <th scope="col">Location</th>
            {/* <th scope="col">Register Date</th> */}
         
 
            <th scope="col">Option</th>
          </tr>
        </thead>
        {branches.map(function fn(branch) {
          return (
            <tbody>
              <tr>
                <th scope="row">{branch.branchid} </th>
                <td>{branch.branchName}</td>
                <td>{branch.location}</td>
                {/* <td>{branch.regDate}</td> */}
                
                <td>
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={() => editBranch(branch.branchid)}
                  >
                    Edit
                  </button>
                
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteBranch(branch.branchid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table> 



      {/* form for edit */}
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Branch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Branch Name</Form.Label>
              
              <input type="text" className="form-control" 
              value={editName} onChange={(e)=>seteditName(e.target.value)}></input>
        
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Location</Form.Label>
              <input type="text" className="form-control" 
              value={editloc} onChange={(e)=>seteditloc(e.target.value)}></input>

            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={update}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    
      
      </div>

      </div>
    );
  }
  
  export default BranchCrud;
  