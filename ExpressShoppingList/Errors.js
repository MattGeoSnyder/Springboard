class QueryError extends Error {
    constructor(status) {
        super();
        this.msg = "Bad request. Cannot find item in database"
        this.status = status;
    }
}

module.exports = QueryError;