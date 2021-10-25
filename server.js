import app from "./app.js";

 const PORT = 3000;

// app.listen(PORT,()=>console.log(`listening on ${PORT}`));
// console.log(`listening on ${process.env.PORT}`)
// app.listen(process.env.PORT || 4000,()=>console.log(`listening on ${process.env.PORT}`));
app.listen(PORT,()=>console.log(`listening on ${PORT}`));