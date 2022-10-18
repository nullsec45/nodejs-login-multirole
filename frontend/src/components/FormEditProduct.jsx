import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";


const FormEditProduct = () => {
	const [name, setName]=useState("");
	const [price, setPrice]=useState("");
	const [message, setMessage]=useState("");
	const navigate=useNavigate();
	const {id}=useParams();
	useEffect(() => {
		const getProductById=async () =>{
			try{
				const response=await axios.get(`http://localhost:5000/products/${id}`);
				setName(response.data.name);
				setPrice(response.data.price);
			}catch(error){
				if(error.response){
					setMessage(error.response.data.msg);
				}
			}
		}
		getProductById();
	},[id]);
	const updateProduct=async (e) => {
		e.preventDefault();
		try{
			await axios.patch(`http://localhost:5000/products/${id}`, {
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
			<h2 className="subtitle">Edit Product</h2>
			<div className="card">
				<div className="card-content">
					<div className="content">
						<form onSubmit={updateProduct}> 
							<p className="has-text-centered">{message}</p>
							<div className="field">	
						  	    <label className="label" for="name">Name</label>
								<div className="control">	
									<input type="text" name="name" className="input"  id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name"/>
								</div>	
						    </div>	
						    <div className="field">	
						  	    <label className="label" for="price">Price</label>
								<div className="control">	
									<input type="text" name="price" className="input"  id="price"  value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price"/>
								</div>	
						    </div>	
						    

						    <div className="field mt-5">	
						    	<div className="control">
						  			<button className="button is-success" type="submit">Update</button>	
						    	</div>

						    </div>	
						</form>
					</div>
				</div>
			</div>			
		</div>
	)
}

export default FormEditProduct