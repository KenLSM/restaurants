export default app => {
    app.use("/", (req, res) => {
        return res.send("hello world");
    })
}