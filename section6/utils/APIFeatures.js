class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        // Filtering
        const queryObj = { ...this.queryString };
        const excludefields = ['page', 'sort', 'limit', 'fields'];
        excludefields.forEach(el => delete queryObj[el]);

        this.query = this.query.find();
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            console.log(sortBy)
            this.query = this.query.sort(sortBy);
        }
        else {
            // this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields(){
        if (this.queryString.fields) {
            const fields = req.query.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select('-__v');
        }

        return this;
    }
    paginate(){
        const page = this.queryString.page * 1 || 1; 
        const limit = this.queryString.limit * 1 || 3;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit) 
        // if (this.queryString.page) {
        //     const numTours = await Tour.countDocuments();
        //     if (skip >= numTours) {
        //         throw new Error('This page does not exist');
        //     }
        // }
        //We dont need the above line of code

        return this;
    }
}

module.exports = APIFeatures;