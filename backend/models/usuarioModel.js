const pool = require('../bd');

async function getUsuario(id){
    try {
        console.log('entro a modelo');
        let query = "select nombre_usuario, mail_usuario, telefono_usuario, apellido_usuario from ?? where id_usuario = ?";
        const rows = await pool.query(query,[process.env.TABLA_USUARIOS, id]);
        return rows;
    } catch (error) {
        console.log('error en el model');
        throw error;
    }
}

async function updateUsuario(id,obj){
    try {
        let query = "update ?? set ? where id_usuario = ?";
        const rows = await pool.query(query,[process.env.TABLA_USUARIOS,obj,id]);
        console.log(rows);
        return rows.affectedRows;
    } catch (error) {
        throw error;
    }
}

module.exports = {getUsuario, updateUsuario}