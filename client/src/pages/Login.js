import { useState } from 'react'
import logo from "../assets/favicon.png"
import "../styles/login.css"

function App() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			// alert('Login successful')
			window.location.href = '/dashboard'
		} else {
			alert('Uusário ou senha incorretos')
		}
	}

	return (
		
		<section>
        <div className="px-4 py-5 px-md-5 text-center text-md-start">
            <div className="container">
                <div className="row gx-md-5 align-items-center">
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
                
                <div className="col-md-6 mb-5 mb-md-0">
                    <div className="card">
                        <div className="card-body py-5 px-md-5">
                            <form onSubmit={loginUser}>
                                
                                <div className="form-outline mb-3">
                                    <input type="email" id="form3Example3" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemplo@email.com"/>
                                    <label className="form-label" htmlFor="form3Example3">Email</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="password-login" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    <label className="form-label" htmlFor="form3Example4">Senha</label>
                                </div>
                                <div className="row mb-4">
                                    <div className="d-flex justify-content-start">
                                    	<p>Não tem uma conta? <a href="/register">Clique aqui</a></p>
                                    </div>
                                </div>
                                    <input type="submit" className="btn btn-primary btn-block text-uppercase mb-4" value="Entrar" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		</div>
    </section>
		

		// <>
		// 	<h1>Login</h1>
		// 	<form onSubmit={loginUser} >
		// 		<input
		// 			value={email}
		// 			onChange={(e) => setEmail(e.target.value)}
		// 			type="email"
		// 			placeholder="Email"
		// 		/>
		// 		<br />
		// 		<input
		// 			value={password}
		// 			onChange={(e) => setPassword(e.target.value)}
		// 			type="password"
		// 			placeholder="Password"
		// 		/>
		// 		<br />
		// 		<input type="submit" value="Login" />
		// 	</form>
		// </>
	)
}

export default App
