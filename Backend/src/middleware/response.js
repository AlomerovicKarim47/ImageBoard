const sendResponse = (req, res, next) => {
    let response = {
        path: req.url,
        status: res.statusCode,
        message: res.responseMessage?res.responseMessage:"Request successful.",
        data: res.responseData?res.responseData:null
    }
    res.end(JSON.stringify(response))
}

export default sendResponse