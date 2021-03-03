

class indexController {
   indexControling(req, res) {
    res.render('index');
   }
}

module.exports = new indexController()