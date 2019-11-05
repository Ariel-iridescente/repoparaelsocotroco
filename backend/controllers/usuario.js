var express = require('express');
var router = express.Router();

const usuarioModel = require('../models/usuarioModel');

router.get('/:id', async (req, res, next) => {
    try {
        console.log('entro al controller');
        let datausuario = await usuarioModel.getUsuario(req.params.id);
        console.log(datausuario);
        res.json(datausuario);
    } catch (error) {
        console.log('error en el controller');
        res.status(500).json({status : 'error'});
    }
})

router.put('/:id', async (req,res,next) => {
    try {
        let obj = {
            nombre_usuario : req.body.nombre_usuario,
            apellido_usuario : req.body.apellido_usuario,
            mail_usuario : req.body.mail_usuario,
            telefono_usuario : req.body.telefono_usuario
        };
        let updateuser = await usuarioModel.updateUsuario(req.params.id,obj);
        console.log(obj);
        if (updateuser > 0) {
            res.json({status: 'ok'})
        } else {
            res.json({status : 'error'})
        }
    } catch (error) {
        console.log('error en el controller');
        res.status(500).json({status : 'error'});
    }
})

module.exports = router;