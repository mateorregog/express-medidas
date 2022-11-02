const express = require("express");
const morgan = require("morgan");
var EmailCtrl = require('./path/to/controller/mailCtrl');

const app = express();
let medida = [
  {
    id: 1,
    name: "laptop",
    price: 3000,
  },
];
app.use(morgan("dev"));
app.use(express.json());


//email route
router.post('/email', EmailCtrl.sendEmail);

//Retorna una medida en específico con la ruta /medida/(numero de id)
app.get("/medida/:id", (req, res) => {
  console.log(req.params.id);
  //Esta función verifica si la medida existe o no
  const medidaFound = medida.find(
    (medida) => medida.id === parseInt(req.params.id)
  );
  if (!medidaFound)
    return res.status(400).json({
      message: "medida no encontrada",
    });

  console.log(medidaFound);
  res.json(medidaFound);
});

//Devuelve todas las medidas
app.get("/medida", (req, res) => {
  res.json(medida);
});

//Agrega un nuevo producto al arreglo
app.post("/medida", (req, res) => {
  const newMedida = { ...req.body, id: medida.length + 1 }; //Se crea un objeto con los elementos de request body mas el id
  coonsulta.push(newMedida); //Se agrega la nueva medida al arreglo
  res.send(newMedida); //Se envia la medida al cliente
});

app.delete("/medida/:id", (req, res) => {
  const medidaFound = medida.find(
    (medida) => medida.id === parseInt(req.params.id)
  );
  if (!medidaFound)
    return res.status(400).json({
      message: "Medida no encontrada",
    });

  medida = medida.filter(
    (medida) => medida.id !== parseInt(req.params.id)
  ); //Devuelve un arreglo filtrando y quitando la medida especificado

  res.sendStatus(204);
});

app.put("/medida/:id", (req, res) => {
  const newData = req.body; //{name:"sdgafd", value:10}
  const medidaFound = medida.find(
    (medida) => medida.id === parseInt(req.params.id)
  );

  if (!medidaFound)
    return res.status(400).json({
      message: "Medida no encontrada",
    });

  medida = medida.map((medida) =>
    medida.id === parseInt(req.params.id) ? { ...medida, ...newData } : medida
  ); //Recorrer el arreglo, por cada comparar su propiedad con el id. Si es true, se actualzian los valores, en caso contrario se mantiene como está
  res.json({
    message: "Medida actualizada"
  });
});

app.listen(3000);

console.log(`Server on port ${3000}`);
