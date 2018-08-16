const mongoose = require('mongoose');
const Product = require('./modal');
/////////////// addProductAttempt ////////////////////////
const addProductAttempt = (request, response) => {
    const product = new Product({
        title: request.body.title,
        name: request.body.name,
        cataqgory: request.body.catagory,
        description: request.body.description,
        model: request.body.model,
        year: request.body.year,
        price: request.body.price
    });
    product
        .save()
        .then(res => {
            response.send({
                status: true,
                pdoductData: res,
                message: 'Product has been added!'
            })
        })
        .catch(err => console.log(err));
};

///////////getAllProductAttempt//////////////////
const getAllProductAttempt = (request, response) => {
    Product.find().select('title name catagory description price')
        .then(docs => {
            if (docs.length >= 0) {
                const desiredResponse = {
                    totalProducts: docs.length,
                    products: docs.map(doc => ({
                        name: doc.name,
                        title: doc.title,
                        catagory: doc.catagory,
                        description: doc.description,
                        price: doc.price,
                        request: {
                            type: 'GET',
                            url: `localhost:8080/dashboard/products/${doc._id}`
                        }
                    }))
                }
                response.send({ status: 200, allProducts: desiredResponse })
            } else {

                response.send({ status: false, message: 'No products to show..Empty database' })
            }
        })
        .catch(err => respons.send({ status: 500, err }))
}

///////////////// getProductAttempt   /////////////////////////

const getProductAttempt = (request, response) => {
    const id = request.params.productId;
    Product.findById(id)
        .select('name title description price')
        .then(doc => {
            console.log(`Response from :/Product: ${doc}`);
            if (doc) {
                const doc = {
                    name: doc.name,
                    title: doc.title,
                    catagory: doc.catagory,
                    description: doc.description,
                    price: doc.price,
                    request: {
                        type: 'GET',
                        url: `localhost:8080/dashboard/products/${doc._id}`
                    }
                }
                response.send({ status: 200, product });
            } else {
                response.send({ status: 404, message: 'No valid entry found for provided productID' });
            }
        })
        .catch(err => response.send({ status: 500, err }))
}

///////////// deleteProduct ///////////////
const deleteProduct = (request, response) => {
    const _id = request.params.id;
    Product.remove({ _id })
        .then(res => {
            response.send({ status: 200, res })
        })
        .catch(err => response.send({ status: 500, message: err.message }))
}
//////////////// SearchProductAttempt /////////////
const searchProductAttempt = (req, res) => {
    const nameOfProduct = req.params.name
    Product.find({
        'name': `${nameOfProduct}`
    })
        .select('name title description price')
        .then(doc => {
            if (doc.length > 0) {
                productArray = [];
                doc.map(document => {
                    let product = {
                        name: document.name,
                        title: document.title,
                        catagory: document.catagory,
                        description: document.description,
                        price: document.price,
                        request: {
                            type: 'GET',
                            url: `localhost:8080/dashboard/products/searchProduct/` + nameOfProduct
                        }
                    };
                    productArray.push(product);
                })

                res.send({
                    status: true,
                    products: productArray
                });
            } else {
                res.send({
                    status: 404,
                    message: 'No record Found for this name'
                });
            }
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        })
};

const searchViaCatagoryAttempt = (req, res) => {
    const catagoryName = req.params.name
    Product.find({
        'name': `${catagoryName}`
    })
        .select('name title description price')
        .then(doc => {
            if (doc.length > 0) {
                productArray = [];
                doc.map(document => {
                    let product = {
                        name: document.name,
                        title: document.title,
                        catagory: document.catagory,
                        description: document.description,
                        price: document.price,
                        request: {
                            type: 'GET',
                            url: `localhost:8080/dashboard/products/searchProduct/` + catagoryName
                        }
                    };
                    productArray.push(product);
                })

                res.send({
                    status: true,
                    products: productArray
                });
            } else {
                res.send({
                    status: 404,
                    message: 'No record Found for this name'
                });
            }
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        })
};

module.exports = {
    addProductAttempt,
    searchProductAttempt,
    searchViaCatagoryAttempt,
    getProductAttempt,
    getAllProductAttempt,
    deleteProduct
};