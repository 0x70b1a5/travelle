import React from 'react'
import axios from 'axios'

export default React.createClass({
  getInitialState() {
    return {
      user: "Nobody"
    }
  },
  componentDidMount(){
    axios.get('/auth/user').then((res) =>{
      console.log("res", res);
      this.setState({
        user: res.data
      })
    })
  },
  render(){
    return (
      <section>
        <div className="container">
          {this.state.user.email}
        </div>
      </section>
    )
  }
})
