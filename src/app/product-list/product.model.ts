export class ProductModel{
    constructor(
        public _id: String,
        public productID: number,
        public productName: String,
        public productCode: String,
        public releaseDate: String,
        public description : String,
        public price : Number,
        public starRating : Number,
        public imageUrl : String
    ){}
}