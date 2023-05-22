function validateZip(req, res, next) {
    const {zip} = req.params;
    let potentialZip = zip.replace(/\D/g, '');
    if (potentialZip.length !== 5 || potentialZip.length !== zip.length) {
        return next(`Zip (${zip}) is invalid!`)
    } else {
        next();
    }
}

module.exports = validateZip;
