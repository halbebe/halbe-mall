const express = require("express");
const router = express.Router();
const Products = require("../schemas/products.schema.js");

//상품 등록
router.post("/products", async(req,res)=> {
    try{
        const {title, content, author, password} = req.body;


        if (!title||!content||!author||!password)
        {return res.status(400).json({ 
            errorMessage: '데이터 형식이 올바르지 않습니다.' 
        });
        }
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
        return res.json({
            "message": "판매 상품을 등록하였습니다."
          });
    }
    catch {
        return res.status(400).json({ 
            errorMessage: '데이터 형식이 올바르지 않습니다.' 
        });
    }

})

//상품 목록 조회
router.get("/products", async(req, res) => {
   const products = await Products.find({
   });

   products.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))

   return res.json({
    data:products
   });
});

//상품 상세 조회
router.get("/products/:productsId", async(req, res) => {

try{
    const {productsId} = req.params;
   const products = (await Products.find({})).filter(p => p._id.toString() === productsId);
   
   if (products.length === 0){
    return res.status(404).json({
        "message": "상품 조회에 실패하였습니다."
      })
    } else {
        return res.json({data: products[0]});
    } 
}
catch {
    return res.status(404).json({
        "message": "상품 조회에 실패하였습니다."
    })
}

   
 });

 //상품 수정
 router.put("/products/:productsId", async(req, res) => {
    // await Products.updateOne({ _id:id },{
    //     title,content,author
    //   }) 참고용
    const { _id } = req.params;
  const { title, content, status, password, author } = req.body;

  try {
    const existingProduct = await Products.findOne(_id);

    if (existingProduct.password !== password) {
      return res.json({ message: "상품을 수정할 권한이 없습니다." });
    }

    if (existingProduct) {
      existingProduct.title = title;
      existingProduct.author = author;
      existingProduct.content = content;
      existingProduct.status = status;
      existingProduct.password = password;

      await existingProduct.save();
      return res.json({
        message: "상품 정보를 수정하였습니다.",
      });
    } else {
        return res.json({ message: "상품을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "서버 오류가 발생했습니다." });
  }
});

    //상품 삭제
    router.delete("/products/:productsId", async(req, res) => {
        // await Products.deleteOne({_id:id}); 참고용
        // const {productsId} = req.params;

        // const existsproducts = await 
        const {productsId} = req.params;
        console.log(productsId);
        const {password} = req.body;

        const existsproducts = await Products.find({_id:productsId});
       console.log(existsproducts, password);

        if(existsproducts[0].password !== password){
            return res.status(401).json({
                "message": "상품을 삭제할 권한이 존재하지 않습니다."
              })
              
        };
        

         if(existsproducts.length){
            await Products.deleteOne({productsId});
        };

        return res.json({
            "message": "상품을 삭제하였습니다."
          });
    });

module.exports = router;