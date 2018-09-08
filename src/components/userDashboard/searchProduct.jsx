import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductList from "./productList";
import ProductCard from "../PublicProducts/ProductCard";
import { searchProductViaCatagoryAttempt } from "../../store/Actions/productActions";
class SearchProduct extends React.Component {
    constructor() {
        super();
        this.state = {
            catagory: '',
            searchProducts: [],
            error: ''
        }
        this.setCatagory = this.setCatagory.bind(this);
    }
    setCatagory(valueOfInput) {
        this.props.downloadTheseProducts(valueOfInput);
    }

    componentWillReceiveProps(props) {
        const objectFlag = props.allProductsOfDesiredCatagory.productReducer.searchResponseViaCatagory;
        console.log("This is object file: ", objectFlag);
        if (objectFlag.status === 404) {
            console.log('inside ComponentWillRecieveProps');
            this.setState({
                error: 'No record Found!',
                searchProducts: []
            })
        } else {
            this.setState({
                searchProducts: objectFlag.products,
                error: ""
            });
            console.log('Response Of Search: ', objectFlag)
            if (objectFlag.message === "No record Found for this catagory") {
                this.setState({
                    error: 'No record Found for this catagory'
                })
            }
        }

    }
    render() {
        return (
            <div>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <h1>Search Product</h1>
                        <div className="col-md-5 col-lg-5 col-sm-12">
                            <ProductList setCatagory={this.setCatagory} />
                        </div>
                    </div>

                    <div className="row">
                        {
                            this.state.error === "No record Found!" ? <p>{this.state.error}</p> :
                                this.state.searchProducts.map((item) => {
                                    return (
                                        <div className="col-md-4 col-lg-4 col-sm-12" key={item._id}>
                                            <ProductCard productItem={item} />
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>
        )
    }
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        downloadTheseProducts: (catagory) => searchProductViaCatagoryAttempt(catagory)
    }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        allProductsOfDesiredCatagory: state
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct);