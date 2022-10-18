import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const FormAddProduct = () => {
	const [name, setName]=useState("");
	const [price, setPrice]=useState("");
	const [message, setMessage]=useState("");
	const navigate=useNavigate();

	const saveProduct=async (e) => {
		e.preventDefault();
		try{
			await axios.post("http://localhost:5000/products", {
				name:name,
				price:price
			});
			navigate("/products");
		}catch(error){
			if(error.response){
				setMessage(error.response.data.msg);
			}
		}
	}
	return (
		<div>
			<h1 className="title">Products</h1>
			<h2 className="subtitle">Add New Product</h2>
			<div className="card">
				<div className="card-content">
					<div className="content">
						<form onSubmit={saveProduct}> 
							<p className="has-text-centered">{message}</p>
							<div className="field">	
						  	    <label className="label" for="name">Name</label>
								<div className="control">	
									<input type="text" name="name" className="input" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Product Name"/>
								</div>	
						    </div>	
						    <div className="field">	
						  	    <label className="label" for="price">Price</label>
								<div className="control">	
									<input type="text" name="price" className="input"  value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" id="price"/>
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

export default FormAddProduct