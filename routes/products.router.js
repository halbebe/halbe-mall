const express = require("express");
const router = express.Router();
const Products = require("../schemas/products.schema.js");

//상품 등록
router.post("/products", async(req,res)=> {
    const {title, content, author, password} = req.body;
    // {
    //     "title":"아이폰15 MAX",
    //     "content": "얼마 사용하지 않은 제품 팝니다.",
    //     "author":"판매자",
    //     "password":"1234"
    //   }

    // 현재 날짜 및 시간 생성
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    let day = currentDate.getDate();
    let hours = currentDate.getHours(); // 시간
    let minutes = currentDate.getMinutes(); // 분
    let seconds = currentDate.getSeconds(); // 초
    let date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    await Products.create({
        title,
        content,
        author,
        status: "for sale", 
        password,
        createdAt: date
        
    });
    res.json({
        "message": "판매 상품을 등록하였습니다."
      });
})

//상품 목록 조회
router.get("/products", async(req, res) => {
   const products = await Products.find({
   });
   res.json({
    data:products
   });
});

//상품 상세 조회
router.get("/products/:productsId", async(req, res) => {
   const {productsId} = req.params;
   const products = (await Products.find({})).filter(p => p._id.toString() === productsId);
   if (products.length === 0){
    //실패 이따가
    } else {
        res.json({data: products[0]});
    } 
 });

 //상품 수정
 router.put("/products/:productsId", async(req, res) => {
    // await Products.updateOne({ _id:id },{
    //     title,content,author
    //   }) 참고용
    // const {productsId} = req.params;
    // const {quantity} = req.body;

    // const existsproducts = await products.find({productsId});
    // if(existsproducts.length){
    //     await products.updateOne(
    //         {productsId: productsId},
    //         {$set:{quantity:quantity}}
    //     )
    // }
    // res.json({
    //     "message": "상품 정보를 수정하였습니다."
    //     });
    });

    //상품 삭제
    router.delete("/products/:_id", async(req, res) => {
        // await Products.deleteOne({_id:id}); 참고용
        // const {productsId} = req.params;

        // const existsproducts = await 
        const {productsId} = req.params;

        const existsproducts = await Products.find({productsId});
        if(existsproducts.length){
            await Products.deleteOne({productsId});
        }
        res.json({
            "message": "상품을 삭제하였습니다."
          });
    });

module.exports = router;