import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {DeleteEditBTNCat, DeleteEditBTNProduct} from "./delete-EditBTN";
import {AppContext} from "./appProvider";

class CategoryContainer extends Component {

    componentDidMount() {}
    render() {
        let data = this.props.data;
        let categoryTemplate;

        if (data.length > 0) {
            categoryTemplate = data.map((item, index) => {
                return (
                    <div className="category-container"
                         key={index}>

                        <AppContext.Consumer>
                            {(context) =>(

                        <CategoryArticle
                            onBodyLoad={this.props.onBodyLoad}
                            data={item}
                            admin={this.props.admin}
                            catEditModalOpen={this.props.catEditModalOpen}
                        />

                            )}
                        </AppContext.Consumer>

                    </div>
                )
            })
        }
        else {categoryTemplate = <p>No categories!</p>}

        return (
            <React.Fragment>
                {categoryTemplate}
            </React.Fragment>
        )
    }
}

class ProductContainer extends Component {

    componentDidMount() {}
    render() {
        let data = this.props.data;
        let admin = this.props.admin;
        let productTemplate;
        if (data.length > 0) {
            productTemplate = data.map(function (item, index) {
                return(
                    <div className='product-container' key={index}>
                        <ProductArticle
                            data={item}
                            admin={admin}
                        />
                    </div>
                )
            })
        }
        else {productTemplate = <p>No product!</p>}

        return (
            <React.Fragment>
                {productTemplate}
            </React.Fragment>
        );
    }
}

class CategoryArticle extends Component {
    getSpecificProduct = async () => {

        let categoryName = this.props.data.categoryName;
        const response = await fetch('/store/getSpecificProducts', {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({categoryName: categoryName})
        });
        const body = await response.json();
        console.log('Category accepted');

        if (response.status !== 200) {
            throw Error(body.message)
        }

        if(typeof this.props.onBodyLoad === 'function') {
            this.props.onBodyLoad(body);
        }
    };

render() {
    let categoryName = this.props.data.categoryName,
        forDeleteEditBTN = null;
    if (this.props.admin === true) {
        forDeleteEditBTN = <DeleteEditBTNCat catEditModalOpen={this.props.catEditModalOpen}
                                             categoryName={this.props.data.categoryName}/>
    }
    return(
        <React.Fragment>
            <Link className ='category__name' to=''
                  onClick={this.getSpecificProduct}>
                {categoryName}</Link>
            {forDeleteEditBTN}
        </React.Fragment>
    )
    }
}

class ProductArticle extends Component {
    render(){
            let productName = this.props.data.productName,
            productCategory = this.props.data.productCategory,
            productSubcategory = this.props.data.productSubcategory,
            productPrice = this.props.data.productPrice,
                forDeleteEditBTN = null;
        if (this.props.admin === true) {
            forDeleteEditBTN = <DeleteEditBTNProduct/>}
        return (
            <React.Fragment>
                <p className ='product__name'>{productName}</p>
                <p className ='product__category'>{productCategory}</p>
                <p className ='product__subcategory'>{productSubcategory}</p>
                <p className ='product__price'>{productPrice}$</p>
                {forDeleteEditBTN}
            </React.Fragment>
        )
    }
}

export {CategoryContainer, ProductContainer};

