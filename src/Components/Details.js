import React from 'react';


class Details extends React.Component {
    githubData = {
        "token":process.env.TOKENID,
      }
    constructor(props) {
        super(props)
    
        this.state = {
             data:[],
             header : {
                "Content-Type": "application/json",
                Authorization:"bearer "+this.githubData["token"]
             }
        }
    }
     queryGQL = {
        query:`
        {
            viewer {
              repositories(first: 5) {
                totalCount
                nodes {
                  nameWithOwner,
                  createdAt,
                  url,
                  description,
                  issue(number: 1){
                    url,
                  
                  }
                  name,
                  collaborators(first:3){
                    totalCount
                  }
                }
                pageInfo {
                  endCursor
                  hasNextPage
                }
              }
            }
          }
        `
      }
    componentDidMount() {
        fetch('https://api.github.com/graphql',{
            method:'POST',
            headers:this.state.header,
            mode:'cors',
            body:JSON.stringify(this.queryGQL)
          }).then(res=>res.json())
          .then(data=>{console.log(data.data.viewer.repositories.nodes)
            this.setState({data:data.data.viewer.repositories.nodes})
             }
          )
       
    }
    render() {
        return (
            <div className="container bg-primary text-white">
                <table className="table">
                    <tr>
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>COLLABOTORS</th>
                        <th>REPO lINK</th>
                        <th>CREATED DATE</th>
                        <th>ISSUE URL</th>
                       
                    </tr>
               
              {
                 this.state.data.map((data)=>{
                     return (
                         <>
                         <tr>
                             <td>{data.nameWithOwner}</td>
                             <td>{data.description}</td>
                             <td>{data.collaborators.totalCount}</td>
                             <td>Repository Link: <a href={data.url}>Link</a></td>
                             <td>{data.createdAt}</td>
                             <td>Issue Link: <a href={data.issue.url}>Link</a></td>
                         </tr>
                         </>
                     )
                 })  
              }
              </table>
            </div>
        );
    }
}

export default Details;