import { getIngredientsFromImage } from './src/vision-api-service';
import { getRecipeInformation, getRecipesFromIngredients } from './src/recipe-api-service'
import express from 'express';
import { promises as fs } from 'fs';
import uuid4 from 'uuid4';
var cors = require('cors')

const app = express();
const port = 8080;
const router = express.Router()
app.use(express.text());
app.use(express.json());
app.use(cors());
app.use(router);

router.get('/', (req: any, res: any) => {
    res.send('Hello World!')
})

router.post('/upload', async function (req: any, res: any) {
    const imageDataUrl = req.body;
    var myRegexp = /(data:image\/)(.+?)(;base64,)(.+)/g;
    const [a, b, format, c, imageData] = myRegexp.exec(imageDataUrl);
    const imageName = uuid4();
    const ext = format === "jpeg" ? "jpg" : format;
    const imagePath = `src/temp-images/${imageName}.${ext}`;

    await fs.writeFile(imagePath, imageData, { encoding: 'base64' });

    getIngredientsFromImage(imagePath).then((ingredients: any) => {
        res.json({
            ingredients
        });
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
})

router.get('/fullRecipe', async function (req: any, res: any) {
    getRecipeInformation(req.query.recipeId).then((recipe: any) => {
        res.json({ recipe })
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
})

router.post('/recipesOfIngredients', async function (req: any, res: any) {
    getRecipesFromIngredients(req.body.Ingredients, req.query.RecipeType).then((recipes: any) => {
        res.json({ recipe: recipes })
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = router
