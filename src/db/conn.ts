import mongoose from "mongoose";

async function main() {
  await mongoose.connect(
    "mongodb+srv://gabrieldb:12345678910@gabrieldb.kpwuk.mongodb.net/?retryWrites=true&w=majority&appName=gabrieldb"
  );
  console.log("conectou ao mongoose!");
  // await mongoose.connect("mongodb://localhost:27017/falatu");
}

//mongodb+srv://gabrieldb:<db_password>@gabrieldb.kpwuk.mongodb.net/?retryWrites=true&w=majority&appName=gabrieldb

main().catch((err) => console.log(err));

export default mongoose;
