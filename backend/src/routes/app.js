const produtoRoutes = require("./routes/produtoRoutes");
const vendaRoutes = require("./routes/vendaRoutes");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROTAS API
app.use("/api", produtoRoutes);
app.use("/api", vendaRoutes);

// TESTE
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

module.exports = app;