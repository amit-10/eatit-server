import { getIngredientsFromImage } from './src/vision-api-service';
import express from 'express';
import { promises as fs } from 'fs';
import uuid4 from 'uuid4';

const app = express()
const port = 3000
const router = express.Router()

app.use(express.text());
app.use(router);

router.get('/', (req: any, res: any) => {
    res.send('Hello World!')
})

router.post('/upload', async function (req: any, res: any) {
    const image = req.body;
    const iamgeName = uuid4();
    const imagePath = `src/temp-images/${iamgeName}.png`;

    await fs.writeFile(imagePath, image, {encoding: 'base64'});

    getIngredientsFromImage(imagePath).then((ingredients: any) => {
        res.json({
            ingredients
        });
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = router
