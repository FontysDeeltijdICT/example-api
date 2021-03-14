const Beer = require('../models/beer')
const mongoose = require("mongoose");

exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body) {
        return res.status(400).send({
            message: "Beer can't be empty"
        })
    }

    const beer = new Beer({
        name: req.body.name,
        percentage: req.body.percentage
    })

    beer.save()
        .then(data => {
            res.status(201).send(data)
        })
        .catch(err => {
            if (err instanceof mongoose.Error.ValidationError) {
                return res.status(400).send({
                    error: err.message
                })
            }

            res.status(500).send({
                error: err.message
            })
        })
}

exports.getAll = (req, res) => {
    Beer.find()
        .then(beers => {
            res.send(beers)
        })
        .catch(err => {
            res.status(500).send({
                error: err.message
            })
        })
}

exports.get = (req, res) => {
    Beer.findById(req.params.id)
        .then(beer => {
            if (!beer) {
                return res.status(404).send({
                    error: "Beer not found with id " + req.params.id
                })
            }
            res.send(beer)
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    error: "Beer not found with id " + req.params.id
                })
            }

            res.status(500).send({
                error: err.message
            })
        })
}

exports.update = (req, res) => {
    Beer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        percentage: req.body.percentage
    }, {new: true})
        .then(beer => {
            if (!beer) {
                return res.status(404).send({
                    error: "Beer not found with id " + req.params.id
                })
            }
            res.send(beer)
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    error: "Beer not found with id " + req.params.id
                })
            }

            res.status(500).send({
                error: err.message
            })
        })
}

exports.delete = (req, res) => {
    Beer.findByIdAndRemove(req.params.id)
        .then(beer => {
            if (!beer) {
                return res.status(404).send({
                    error: "Beer not found with id " + req.params.id
                })
            }

            res.send()
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err instanceof mongoose.Error.DocumentNotFoundError) {
                return res.status(404).send({
                    error: "Beer not found with id " + req.params.id
                })
            }

            res.status(500).send({
                error: err.message
            })
        })
}
