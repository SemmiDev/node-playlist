import app from './app.mjs';
import connectDb from './db.mjs';
import {deleteAllData, populateData} from './populate.mjs'

const PORT = process.env.PORT || 3000;

connectDb().then(() => {
    populateData();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
