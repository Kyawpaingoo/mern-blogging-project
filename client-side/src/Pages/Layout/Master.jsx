import AuthComponent from "./AuthComponent.jsx"
import MostLoveArticle from "./MostLoveArticle.jsx"
import MostTrendingArticle from "./MostTrendingArticle.jsx"
import TagComponents from "./TagComponents.jsx"

const Master = (props) => {
  return (
    <div className="m-5">
        <div className="row">
            <div className="col-8">
            <h2 className="text-primary bg-card p-2 pl-5 rounded">
            MERN Fullstack Community Blogging -{" "}
            <span className="text-success">MMCoder</span>
            </h2>
            <div className="bg-card rounded p-4">
                {props.children}
            </div> 
            </div>
            <div className="col-4">
            <AuthComponent />
            
            <TagComponents />
            <MostTrendingArticle />
            <MostLoveArticle />

            </div>
        </div>
        </div>
  )
}

export default Master