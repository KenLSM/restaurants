import { Express, query } from 'express';


export default (app: Express) => {
    app.get('/api/search', (req, res) => {
        const query = req.query;
        const { restaurants, time } = query;
        if (query.restaurants) {
            const { restaurants } = query;
        }
        return res.json({ query, });
    })

    app.get("/", (req, res) => {
        return res.send("hello world");
    })


    console.log('Loaded routes!');
}