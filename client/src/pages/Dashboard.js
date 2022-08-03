import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'

const Dashboard = () => {
	const history = useHistory()
	const [lead, setLead] = useState('')
	const [tempLead, setTempLead] = useState('')

	async function populateLead() {
		const req = await fetch('http://localhost:1337/lead', {
			method: 'GET',
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setLead(data.lead)
		} else {
			alert(data.error)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history.replace('/login')
			} else {
				populateLead()
			}
		}
		// eslint-disable-next-line
	}, [])

	async function updateLead(event) {
		event.preventDefault()

		const req = await fetch('http://localhost:1337/lead', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				lead: tempLead,
			}),
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setLead(tempLead)
			setTempLead('')
		} else {
			// alert(data.error)
		}
	}
	
	function logout() {
		localStorage.removeItem("token")
        window.location.href = '/'
	}

	return (
		<div>
			<h1>Lead : {lead || 'Nenhum lead foi encontrado'}</h1>
			<form onSubmit={updateLead}>
				<input
					type="text"
					placeholder="Lead"
					value={tempLead}
					onChange={(e) => setTempLead(e.target.value)}
				/>
				<input type="submit" value="Atualizar lead" />
			</form>
			<fieldset>
					<input type="submit" value="Logout" onClick={logout}/>
				</fieldset>
		</div>
	)
}

export default Dashboard
