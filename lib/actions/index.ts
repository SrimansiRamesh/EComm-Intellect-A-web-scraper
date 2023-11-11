"use server"

import { scrapeAmazonProduct } from "../scraper";
import { connecttoDB } from "../mongoose";
import Product from "../models/product.model";
import { getLowestPrice,getAveragePrice,getHighestPrice } from "../utils";
import { revalidatePath } from "next/cache";


export async function scrapeAndStoreProduct(productUrl:string){

  if(!productUrl)
    return;
  try{
    //database setup
    connecttoDB();

    const scrapedProduct= await scrapeAmazonProduct(productUrl);

    if(!scrapedProduct) return;

    let product=scrapedProduct;
    const existingProduct= await Product.findOne({url:scrapedProduct.url});

    if(existingProduct){
      const updatedPriceHistory:any=[
        ...existingProduct.priceHistory,
        {price:scrapedProduct.currentPrice}
      ]
      product={
        ...scrapedProduct,
        priceHistory:updatedPriceHistory,
        lowestPrice:getLowestPrice(updatedPriceHistory),
        highestPrice:getHighestPrice(updatedPriceHistory),
        averagePrice:getAveragePrice(updatedPriceHistory),
      }
    }
    const newProduct=await Product.findOneAndUpdate(
      {url:scrapedProduct.url},
      product,
      {upsert:true,new:true}
    );

    revalidatePath(`/products/${newProduct._id}`);
  }catch(error:any){
    throw new Error(`Failed to create/update product:${error.message}`)
  }
}

export async function getProductById(productId:string){
  try{
    connecttoDB();
    const product=await Product.findOne({_id:productId});
    if(!product) return null;
    return product;
  }catch(error){

  }
}

export async function getAllProducts(){
  try{
    connecttoDB();
    const products=await Product.find();
    return products;
  }catch(error){
    console.log(error);
  }
}

export async function getSimilarProducts(productId:string){
  try{
    connecttoDB();
    const currentProduct=await Product.findById(productId);

    if(!currentProduct) return null;
    const similarProducts=await Product.find({
      _id:{$ne:productId},
    }).limit(3);
    return similarProducts;
  }catch(error){
    console.log(error);
  }
}

