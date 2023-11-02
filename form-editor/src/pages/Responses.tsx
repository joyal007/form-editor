import { API_URL } from "@/lib/constants";
import React from "react";
import { useParams } from "react-router-dom";

function Responses() {
  const params = useParams();
  const [res, setRes] = React.useState();
  React.useEffect(() => {
    fetch(API_URL + "forms/responses/" + params.id)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.response)
        setRes(res.response);
      });
  }, []);

  const form = React.useMemo(() => {
        const resp = {}
        res?.form?.questions.forEach( (e: any) => {
            resp[e.id] = e
        })
        return resp;
  },[res])
  console.log(form)
  return (
    <div className="mt-10">
    <div className='absolute right-4 top-5 flex flex-col justify-center items-center'>
      <h3>Total Number of responses</h3>
      <p>{res?.response.length}</p>
    </div>
    <p>Responses</p>
    {/* { res?.response?.map(e => {
        console.log(e.questionId, form)
        const key = e.questionId
        console.log(form[`${key}`])
        return (
            <div>null</div>
        )
    })} */}
    </div>
  );
}

export default Responses;
