const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.productById = (req,res,next,id)=>{
    Product.findById(id).exec((err, product)=>{
        if(err || !product){
            return res.status(400).json({
                error: 'Product Not found'
            });
        }

        req.product = product;
        next();
    });
}

exports.read = (req,res)=>{
    req.product.photo = undefined
    return res.json(req.product);
}

exports.create = (req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        //Check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if(!name || !description || !price || !category || !quantity || !shipping ){
            return res.status(400).json({
                error: 'All fields are required'
            })
        }

        let product = new Product(fields)

        if(files.photo){
            console.log('Files photo:', files.photo);
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result)=>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
};


exports.remove = (req,res)=>{
    let product = req.product;
    product.remove((err, deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({
            message: "Product deleted successfully"
        })
    })
}

exports.update = (req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        //Check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if(!name || !description || !price || !category || !quantity || !shipping ){
            return res.status(400).json({
                error: 'All fields are required'
            })
        }

        let product = req.product
        product = _.extend(product, fields);

        if(files.photo){
            console.log('Files photo:', files.photo);
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result)=>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
};

/**
 * Return product based on sell and arrival
 * by sell = /product?sortBy=sold&order=desc&limit=4
 * by arrival = /product?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all product are returned
*/


exports.list = (req,res)=>{
    let order = req.query.order? req.query.order : 'asc';
    let sortBy = req.query.sortBy? req.query.sortBy : '_id';
    let limit = req.query.limit? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy,order]])
        .limit(limit)
        .exec((err, products)=>{
            if(err){
                return res.status(400).json({
                    error: 'Products not found'
                })
            }

            res.json(products)
        })
}

/**
 * It will find the products based on the request product category
 * other product that has the same category will be returned
 */

exports.listRelated = (req,res)=>{
    let limit = req.query.limit? Number(req.query.limit) : 6;

    Product.find({ _id: {$ne: req.product}, category: req.product.category })
    .limit(limit)
    .populate("category","_id name")
    .exec((err, products)=>{
        if(err){
            return res.status(400).json({
                error: 'Products not found'
            })
        }

        res.json(products);
    })
}

exports.listCategories = (req,res)=>{
    Product.distinct("category", {}, (err,categories)=>{
        if(err){
            return res.status(400).json({
                error: 'Products not found'
            })
        }
        res.json(categories);
    })
}


exports.listBySearch =(req,res)=>{
    let order = req.query.order? req.query.order : "desc";
    let sortBy = req.query.sortBy? req.query.sortBy : "_id";
    let limit = req.query.limit? parseInt(req.query.limit) : 100;
    let skip =  parseInt(req.query.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0){
            if(key === "price"){
                //gte = greater than price [0,10]
                //lte = less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            }else{
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
       .select("-photo")
       .populate("category")
       .sort([[sortBy, order]])
       .skip(skip)
       .limit(limit)
       .exec((err,data)=>{
           if(err){
               return res.status(400).json({
                   error: 'Products not found'
               });
           }
           
           res.json({
               size: data.length,
               data
           });
       });
}

exports.photo = (req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data)        //Cant be res.json() because photo is not a json data type
        next();
    }
}