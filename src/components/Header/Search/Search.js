import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputVal : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.searchFilter = this.searchFilter.bind(this)
  }

  handleChange(val) {
    console.log(val)
    this.setState({
      inputVal: val
    })
  }

  searchFilter() {
    const {filterPostsFn} = this.props
    const query = this.state.inputVal
    filterPostsFn(query)
    this.setState({
      inputVal: ''
    })
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" value={this.state.inputVal} onChange={(e)=>{this.handleChange(e.target.value)}} />

          <SearchIcon id="Search__icon" onClick={()=>this.searchFilter()} />
        </div>
        
      </section>
    )
  }
}