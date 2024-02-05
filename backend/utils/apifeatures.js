class ApiFeatures{

    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
     
    }
 
     Search() {

        const key = this.queryStr.keyword?{
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } : {};      
        this.query =this.query.find({...key})

        return this;


    }

    filter() {
        const queryCopy = { ...this.queryStr };
        const removeFields = ["keyword", "page", "limit"]
        removeFields.forEach(key => delete queryCopy[key]);

        // This for price and rating

        //  console.log(queryCopy)
        let queryStr = JSON.stringify(queryCopy);

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

        this.query = this.query.find(JSON.parse(queryStr))
        // console.log(queryStr)
        return this;
    }



    // This is for posination 
    pagination(resuiltPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resuiltPerPage * (currentPage - 1);

        this.query = this.query.limit(resuiltPerPage).skip(skip)

        return this;
    }
};





module.exports = ApiFeatures;