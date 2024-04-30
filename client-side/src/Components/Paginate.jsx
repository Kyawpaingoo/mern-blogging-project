import React from 'react'

const Paginate = ({page, totalPage, setPage}) => {

  return (
    <div className="col-12 mt-3">
        <div className="d-flex justify-content-center">
            <button className="btn btn-primary" 
                    onClick={()=>setPage(page-1)} disabled={page <= 1}
            >
                Previous
            </button>
            <button className="btn btn-primary" 
                    onClick={()=>setPage(page+1)} disabled={page >= totalPage}
            >
                Next
            </button>
        </div>
    </div>
  )
}

export default Paginate