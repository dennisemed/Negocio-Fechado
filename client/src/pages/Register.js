import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import logo from "../assets/favicon.png"
import "../styles/register.css"

function App() {
	const history = useHistory()

	const [name, setName] = useState('')
	const [cnpj, setCnpj] = useState('')
	const [address, setAddress] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				cnpj,
				address,
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			history.push('/dashboard')
		}

		console.log(data)
	}

	return (
		<section className="vh-100 justify-content-center align-items-center d-flex">
        	<div className=" px-md-5 text-center text-lg-start">
				<div className="container">
					<div className="row gx-lg-5 align-items-center">
						<div className="col-md-6 mb-5 mb-md-0">
							<div className="nav-brand">
								<a className="navbar-brand text-uppercase" href="/"><img src={logo} alt="logomarca da CRM Negócio Fechado"/>
								negócio fechado
								</a>
							</div>
							<h1 className="my-4 fw-bold ls-tight">
							As melhores soluções <br/>
							<span>para sua empresa</span>
							</h1>
						</div>
			
					<div className="col-lg-5 mb-5 mb-lg-0">
						<div className="card">
							<div className="card-body py-5 px-5">
								<form onSubmit={registerUser} >
									<div className="row">
										<div className="col-md-6 mb-4">
										<div className="form-outline">
											<input type="text" id="form3Example1" className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} required/>
											<label className="form-label" htmlFor="form3Example1">Nome da Empresa</label>
										</div>
										</div>
										<div className="col-md-6 mb-4">
										<div className="form-outline">
											<input type="string" id="form3Example2" className="form-control" name="cnpj" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required/>
											<label className="form-label" htmlFor="form3Example2">CNPJ</label>
										</div>
										</div>
										<div className="form-outline mb-4">
											<input type="string" id="form3Example" className="form-control" name="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
											<label className="form-label5" htmlFor="form3Example4">Endereço</label>
										</div>
									</div>
									<div className="form-outline mb-4">
										<input type="email" id="form3Example3" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
										<label className="form-label" htmlFor="form3Example3">Email</label>
									</div>
									<div className="form-outline mb-4">
										<input type="password" id="form3Example4" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
										<label className="form-label" htmlFor="form3Example4">Senha</label>
									</div>
									<div className="row mb-4">
										<div className="d-flex justify-content-start">
											<p>Já tem uma conta? <a href="/login">Clique aqui</a></p>
										</div>
									</div>
									<input type="submit" className="btn btn-primary btn-block text-uppercase mb-4" value="Cadastrar" id="signup"/>
								</form>
							</div>
						</div>
					</div>
				</div>
        	</div>
		</div>
    </section>
)
}

export default App
