import React from 'react';


class Product extends React.Component {

    constructor(props) {
        super(props);

    }

    handleUpVote =()=>{
        this.props.onVote(this.props.id);
    };

    render(){

        return (
            <div className="item">
                <div className="middle align content">
                    <div className="header">
                        <a onClick={this.handleUpVote}>
                            <i className="large caret up icon" />
                        </a>{this.props.votes}
                    </div>
                    <div className="description">
                        <a href={this.props.url}>{this.props.title}</a>
                        <p>{this.props.description}</p>
                    </div>
                    <div className="extra">
                        <span> Submitted by {this.props.author}</span>
                    </div>
                </div>
            </div>
        )
    }
}


class ProductList extends React.Component{

    constructor(props){
        super(props);
        this.handleProductUpVote = this.handleProductUpVote.bind(this);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.loadProducts()
    }


    loadProducts(){
        const endpoint = '/api/products/';
        const thisComp = this;
        const lookupOptions = {
            method: 'GET',
            headers: {
                'Content-TYpe': 'application/json'
            }
        };
        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
                thisComp.setState({
                    products: responseData
                })
        })
    }

    handleProductUpVote(productId){
        const nextProducts = this.state.products.map((product)=>{
            if (product.id ===productId){
                return Object.assign({}, product, {
                    votes: product.votes+1,
                })
            } else {
                return product
            }
        });
        this.setState({
            products: nextProducts
        })
    }

    render(){
        console.log(this.state.products);
        const products = this.state.products.sort((a,b)=>(
            b.votes - a.votes
        ));
        const productComponents = products.map((product)=>{
            return(
                <Product
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    votes={product.votes}
                    onVote={this.handleProductUpVote}
                />
            )
        });

        return(
            <div className="ui unstackable items">
                {productComponents}
            </div>
        )

    }
}

export default  ProductList;