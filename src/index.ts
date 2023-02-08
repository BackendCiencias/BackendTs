import app from './app'
import db from './config/mongo'
import mongoose from "mongoose"

function main(){
    app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`));
    mongoose.set('strictQuery', false); 
    db().then(() => console.log("Conected to MongoDB Atlas")).catch((err) => console.log(err));
    
}


main();