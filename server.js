import app from "./app.js";

// const PORT = 3000;

// app.listen(PORT,()=>console.log(`listening on ${PORT}`));
console.log(`listening on ${process.env.PORT}`)
app.listen(process.env.PORT,()=>console.log(`listening on ${process.env.PORT}`));