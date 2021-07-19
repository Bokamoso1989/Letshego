import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import axios from "axios"

import Card from 'react-bootstrap/Card';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const API_KEY = '0HL6Qh0GjDpTqKFdGzwArPRjJKQPQH8I';

class ArticlesList extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoaded: false,
            selectedArticle: "",
        }

        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {
        var url = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=' + API_KEY;

        axios.get(url)
            .then(json => {
                this.setState({
                    items: json.data.results,
                    isLoaded: true,
                })
            });
    }

    handleClick = (url) => {

        this.setState({
            selectedArticle: url
        });
    }

    render() {

        var { items, isLoaded, selectedArticle } = this.state;

        if (!isLoaded) {

            return <ClipLoader color={"#ffffff"} loading={true} css={override} size={150} />;
        }
        else {
            return (

                <div className="row">
                    <div className="col-md-8" style={{ height: '700px', overflow: 'auto' }}>
                        {items.map((item, i) => (
                            <div id={item.id} key={i} style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                                <Card >
                                    <Card.Body>
                                        <blockquote className="blockquote mb-0">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    {item.title}
                                                    <hr></hr>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-9">
                                                    {item.abstract}
                                                </div>
                                                <div className="col-md-3">
                                                    <button title={'Read More'}
                                                        onClick={() => window.open(item.url, "_blank")}
                                                        style={{ width: '80%', height: '100px', fontSize: '30px' }}>
                                                        {'>'}
                                                    </button>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <footer className="blockquote-footer">
                                                by: <cite title="Source Title">{item.byline}</cite>
                                            </footer>
                                        </blockquote>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))};
                    </div>
                </div>
            );
        }
    }
}

export default ArticlesList;
