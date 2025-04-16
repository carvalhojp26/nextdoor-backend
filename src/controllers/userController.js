const { poolPromise } = require("../config/db");
const userService = require("../services/userService");

const listUsers = async (req, res) => {
    try {
        const result = await userService.getUsers();
        res.json(result);
    } catch (error) {
        console.error("Error fetching users in database: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const addUser = async (req, res) => {
    const {
        nomeUtilizador,
        dataNascimento,
        pontosUtilizador,
        comprovativoResidencia,
        emailUtilizador,
        password,
        VizinhançaidVizinhança,
        EnderecoidEndereco,
        estadoUtilizadoridEstadoUtilizador,
        tipoUtilizadoridTipoUtilizador
    } = req.body;

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('nomeUtilizador', nomeUtilizador)
            .input('dataNascimento', dataNascimento)
            .input('pontosUtilizador', pontosUtilizador)
            .input('comprovativoResidencia', comprovativoResidencia)
            .input('emailUtilizador', emailUtilizador)
            .input('password', password)
            .input('idVizinhanca', VizinhançaidVizinhança)
            .input('idEndereco', EnderecoidEndereco)
            .input('idEstadoUtilizador', estadoUtilizadoridEstadoUtilizador)
            .input('idTipoUtilizador', tipoUtilizadoridTipoUtilizador)
            .query(`
                INSERT INTO [dbo].[Utilizador] (
                    nomeUtilizador,
                    dataNascimento,
                    pontosUtilizador,
                    comprovativoResidencia,
                    emailUtilizador,
                    password,
                    VizinhançaidVizinhança,
                    EnderecoidEndereco,
                    estadoUtilizadoridEstadoUtilizador,
                    tipoUtilizadoridTipoUtilizador
                )
                VALUES (
                    @nomeUtilizador,
                    @dataNascimento,
                    @pontosUtilizador,
                    @comprovativoResidencia,
                    @emailUtilizador,
                    @password,
                    @idVizinhanca,
                    @idEndereco,
                    @idEstadoUtilizador,
                    @idTipoUtilizador
                )
            `);

        res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        console.error("Error adding user in database:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { listUsers, addUser };