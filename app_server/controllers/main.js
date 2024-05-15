/* GET Homepage */
const index = (req, res) => {
    res.render('index', { title: "Travlr Gataways"});
};

module.exports = {
    index
}
