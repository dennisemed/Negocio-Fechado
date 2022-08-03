const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.test = (req, res) => {
    res.send("olá! Teste de Controller");
}

exports.details = (req, res) => {
    User.find({}).then(function(User){
      res.send(User);
    })
}

exports.delete = (req, res, next) => {
    User.findByIdAndRemove({_id: req.params.id}).then(function(User){
      res.send(User);
    }).catch(next);
}

exports.update = (req, res, next) => {
    User.findByIdAndUpdate({_id: req.params.id},
                       req.body).then(function(){
                        User.findOne({_id: req.params.id}).then(function(User){
          res.send(User);
        });
    }).catch(next);
}

exports.register = async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await 
        User.create({
            name: req.body.name,
            cnpj: req.body.cnpj,
            address: req.body.address,
            email: req.body.email,
            password: newPassword
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Email já cadastrado' })
    }
}

exports.login = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })

    if (!user) {
        return { status: 'error', error: 'Usuário não cadastrado' }
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    )

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            'secret123'
        )

        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
}

exports.getLeads = async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok', lead: user.lead })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
}

exports.postLeads = async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        await User.updateOne(
            { email: email },
            { $set: { lead: req.body.lead } }
        )

        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'token inválido' })
    }
}
