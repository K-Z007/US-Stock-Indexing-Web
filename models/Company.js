const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    longName: {
        type: String,
        require: true,
    },
    symbol: {
        type: String,
        require: true,
    },
    zip: {
        type: String,
        default: null,
    },
    sector: {
        type: String,
        require: true,
    },
    fullTimeEmployees: {
        type: Number,
        require: true,
    },
    longBusinessSummary: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        default: null,
    },
    city: {
        type: String,
        default: null,
    },
    state: {
        type: String,
        default: null,
    },
    country: {
        type: String,
        default: "United States",
    },
    exchange: {
        type: String,
        default: "NMS",
    },
    currentPrice: {
        type: Number,
        require: true,
    },
    currency: {
        type: String,
        enum: ["USD", "AUD", "CNY", "JPY", "CAD", "EUR", "GBP", "HKD"],
        default: "USD",
    },
    trailingPE: {
        type: Number,
        default: null,
    },
    debtToEquity: {
        type: Number,
        default: null,
    },
    returnOnEquity: {
        type: Number,
        default: null,
    },
    marketCap: {
        type: Number,
        default: null,
    },
    dividendYield: {
        type: Number,
        default: null,
    },
    logo_url: {
        type: String,
        default: null,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

companySchema.statics.getAllKeys = function () {
    return Object.keys(this.Schema.obj);
};

companySchema.statics.getAllCurrency = function () {
    return this.schema.path("currency").options.enum;
};

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
