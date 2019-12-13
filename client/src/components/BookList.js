import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getAllBooksQuery = gql`
{
    books{
        name,
        id
    }
}
`

class BookList extends Component {
    displayBooks(){
        var data = this.props.data
        if(!data.loading){
            return(
                <div>
                    Loading...
                </div>
            )
        }else{
            return(
                data.books.map(book => {
                    return(
                        <div>{ book.name }</div>
                    )
                })
            )
        }
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <ul id="book-list">
                    {/* { this.displayBooks() } */}
                </ul>
            </div>
        )
    }
}

export default graphql(getAllBooksQuery)(BookList)