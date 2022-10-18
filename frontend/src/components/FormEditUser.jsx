import React,{useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const FormEditUser = () => {
	const [name, setName]=useState("");
	const [email, setEmail]=useState("");
	const [password, setPassword]=useState("");
	const [confirmPassword, setConfirmPassword]=useState("");
	const [role, setRole]=useState("");
	const [message, setMessage]=useState("");
	const navigate=useNavigate();
	const {id}=useParams();

	useEffect(() => {
		const getUserById=async () =>{
			try{
				const response=await axios.get(`http://localhost:5000/users/${id}`);
				setName(response.data.name);
				setEmail(response.data.email);
				setRole(response.data.role);
			}catch(error){
				if(error.response){
					setMessage(error.response.data.msg);
				}
			}
		}
		getUserById();
	},[id]);

	const updateUser=async (e) => {
		e.preventDefault();
		try{
			await axios.patch(`http://localhost:5000/users/${id}`, {
				name:name,
				email:email,
				password:password,
				role:role,
				confirmPassword:confirmPassword
			});
			navigate("/users");
		}catch(error){
			if(error.response){
				setMessage(error.response.data.msg);
			}
		}
	}

	return (
		<div>
			<h1 className="title">Users</h1>
			<h2 className="subtitle">Update User</h2>
			<div className="card">
				<div className="card-content">
					<div className="content">
						<form onSubmit={updateUser}> 
							<div className="field">	
						  	    <label className="label" for="name">Name</label>
								<div className="control">	
									<input type="text" name="name" className="input"  id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="name"/>
								</div>	
						    </div>	
						    <div className="field">	
						  	    <label className="label" for="email">Email</label>
								<div className="control">	
									<input type="text" name="email" className="input" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"/>
								</div>	
						    </div>	
						    
						    <div className="field">	
						  	    <label className="label" for="password">Password</label>
								<div className="control">	
									<input type="password" name="password" className="input" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*********"  />
								</div>	
						    </div>	

						    <div className="field">	
						  	    <label className="label" for="confirmPassword">Confirm Password</label>
								<div className="control">	
									<input type="password" name="confPassword" className="input"  id="confPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="*********" />
								</div>	
						    </div>	

						     <div className="field">	
						  	    <label className="label" for="role">Role</label>
								<div className="control">	
									<div className="select is-fullwidth">	
										<select value={role} onChange={(e) => setRole(e.target.value)} name="role">
											<option value="admin">Admin</option>
											<option value="user">User</option>
										</select>
									</div>	
								</div>	
						    </div>	

						    <div className="field mt-5">	
						    	<div className="control">
						  			<button className="button is-success" type="submit">Save</button>	
						    	</div>

						    </div>	
						</form>
					</div>
				</div>
			</div>			
		</div>
	)
}

export default FormEditUser